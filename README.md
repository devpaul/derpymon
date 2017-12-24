# Redux Refactor

This branch is part of a purposeful effort to refactor the more traditional store/executor pattern to use a Redux style
pattern with Dojo 2 in its place.

## Approach

Refactoring into a Redux pattern can be an incremental process. The trickiest part is managing the migration from a 
traditional store to a Redux store that acts more like a middleware. During Derpymon's transition we'll use the custom
built `inject` and `Container` that allows for multiple injection to allow us to maintain our old store and Redux store
side-by-side. Other approaches could be to move your old store into the Redux store as a non-pure object and migrate
out functionality incrementally or move everything out of the old store into the Redux store. Your preferred approach
likely depends on the number of tests that already exist in your application, how important preventing regressions, and
your willingness to add bridge-frameworks (like the multi-injection `Container`) to support the migration. Whatever your
choice it is important to complete the transition to a Redux pattern. Maintaining two store patterns creates too much
chaos for any benefit it might provide and is not worth keeping around for longer than necessary. 

1. Containerize widgets that use injected state
1. Convert commands to stateless functions detached from an executor
1. Update containers to use stateless commands
1. Move event handlers to stateless commands (attachHandler /detachHandler) in preparation for Redux middleware
1. Create the initial state for the application
1. Create reducer(s) to transform state and match features with the old store's transformed states
1. Create actions and action creators to replace stateless functions (commands)
1. Create a ReduxStore, migrate Containers to use it, and remove the old store(s)
1. Refactor event handlers to Redux middleware 

## Steps

Derpymon was originally designed as a more traditional command/executor pattern. State was encapsulated in multiple
injectors as a means of compartmentalizing and reducing the scope and complexity of application-wide state. The
consequence of this pattern was a need for commands to be able to gather state from multiple sources and potentially
change state at multiple sources. This spreads responsibility for changing state out to the edges of the application
in a uniform way, which makes maintaining it somewhat easy. The most difficult part of this pattern was configuring
the executor to supply the right injectors to the commands. Long term, this will make refactoring more difficult as 
commands call into one another and state is intertwined with commands.

I expect the Redux pattern to be a little cleaner except thunks will still put multiple dependencies on the shape of
the store in the same way as injectable commands. The transformation of data through reducers will help to decouple
command's dual responsibility. Reducers clearly define where data is changed and actions/action creators is where
stuff is done.

### Containerization

Derpymon already made good use of containers early on in the project so we were able to skip this step

### Command Functions

Changing the injectable commands to command functions where all of the necessary store data is provided as properties to
the command was relatively easy. The biggest challenge occurs when one command would call into other commands. Usually
this would be handled via the executor providing configured dependencies to the new command, but without an executor
coordinating this data, parent commands would need to be passed all of the properties necessary to call any potential
child command function. In larger application this will create a cascading complexity for this step.

### Updating Containers

Updating Containers to use the new command functions was easy. Containers are now injected with the necessary data so
the command functions dependencies are satisfied and the Executor and injectable commands were removed.

### Event handlers

The keyboard listeners were moved into `keyboardMiddleware` in anticipation for managing external keyboard events as
a middleware layer. Two methods: `attachListeners` and `detachListeners` were created that will later be replaced with
attach and detach keyboard events actions.

### Create the initial state

The initial state was created for Derpymon based on the three injectors. The initial state's shape has been described
by an interface and it's been added as a `ReduxInjector` as part of Dojo 2's interop package. We haven't replaced the
original stores yet. Because the commands are responsible for what actions and reducers will be responsible for we'll
want to go back and replace commands and store in sections. Fortunately our data and commands are already well 
compartmentalized.

# Derpymon Go

Catch derpy monsters in VR

![derpmander](./docs/derpymon.png)

NOTE: This does not currently work without a modified version of Maquette (included)

## Quickstart

* npm i
* dojo build --watch
* npm run serve
* http://localhost:8888

## Debugging

Debugging for DayDream can be done using 
[Chrome Devtool's remove debugging](https://developers.google.com/web/tools/chrome-devtools/remote-debugging/).

Sometimes the DayDream controller is not correctly detected. It can help to turn on the controller and using 
VR a bit before debugging if you experience these issues.

1. Install Chrome Beta on a DayDream phone
1. Build and serve Derpymon
1. Connect your phone using a USB cable and set up debugging 
1. Run Derpymon using the HTTPS server
1. Touch EnterVR and wait
1. Wait. **Do not put your phone in the DayDream headset** Chrome Beta will switch into DayDream mode.
1. Open _Remote Devices_ in Chrome debug tools, connect to your phone, and inspect the Derpymon page.
 
