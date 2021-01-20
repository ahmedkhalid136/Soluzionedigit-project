Before starting:

- install NodeJS + NPM globally (-g) https://nodejs.org/en/
- install nodemon globally https://www.npmjs.com/package/nodemon
- Make sure to "npm install" in the root project
- make sure to "npm run install" in the root project
- Configure mongoDB on localhost to use db functionality https://www.mongodb.com/try/download/community

What you need to know:

- create a folder inside /modules with the name of your module
- add that name in initializer/appModules.js array

In /Freetime, you can find everything you need to create a module.
Edit that example module keeping in mind this informations:
(If you need a blank module, you can start from '\_test' module instead)

- Handler.js contains all the events that will be listened by the server.
  [API_EVENTS.#####]: (req, res, next) => {
  method.#####(req, res, next);
  },
  All you need to do is to customize the API_EVENTS.##### with the right reference inside the /Router.js and
  the method.##### with the right name of the relative method in /Method.js that will manage that event.

- Method.js contains all of your server methods referred to that module.

- Middleware.js is not so important right now, you'll use it to manage the requests before their relative methods.

- Router.js contains all your routes-to-method association:

  exports.API_EVENTS = API_EVENTS = { <-- leave it as it is
  ###: '###', <-- here you'll add the reference name for every api to handle.
  };
  exports.freetimeAPI = { <-- customize this with the desidered name (see below for detail)
  [API_EVENTS.###]: { <-- here you'll add the reference name for every api to handle.
  method: 'GET', <-- the HTTP METHOD which this path will react to
  path: 'feature/api/path/', <-- the feature API path (see below for detail)
  }
  }

  you need to link the reference name with the right api method (like GET, POST, DELETE, etc...)
  @ Notice that I'm using the same amount of # to explain that is the same variable. Same var goes to same number of '#' @

  ! IMPORTANT THING: the second export needs to be named with MODULE_NAME + 'API' otherwise nothing's going to work
  ! IMPORTANT THING: all the modules have a base API path that is: 'api/v1/'

- Schema.js contains the schema related to your module. We use the mongoDB schema.

For starting the project run the following command inside the project folder:

- npm run dev

TIPs:

- Where requested a file/media upload, this will be handled client-side and will return a Media-ObjectID attached to the resource which need it.
- The user data are available at any endpoint in req.user (thanks to passport.js)
