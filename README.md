<h1 align="center">
  <img alt="Travel-Logo" src="assets/Travel-logo.png" width="200px" />
</h1>

<p align="center">The project facilitates tourists who wish to travel the world by paying the lowest possible price regardless of the number of connections.</p>

## 💻 Technologies used
- [NodeJs](https://nodejs.org/en/) in API.
- [Typescript](https://www.typescriptlang.org/) in code.
- [CSV](https://en.wikipedia.org/wiki/Comma-separated_values) as Database.
- [Jest](https://jestjs.io/en/) for tests.
- [Swagger](https://swagger.io/) for documentation.
s
## ✋🏻 Prerequisite
To execute this project you will need to have the following component in your environment.
### **Node**
[NodeJs](https://nodejs.org/en/) will be responsible for interpreting the application code.

### **Yarn - Package Manager**
[Yarn](https://classic.yarnpkg.com/en/docs/install) will be responsible for the commands to start the application.


## 👨‍💻 Running
The application has two interaction interfaces: an API rest and a CLI command module. Before accessing the interfaces it is necessary that you load the libraries, with the command below inside the project's root folder:

    yarn

The project is built with Typescript, so to compile it to javascript use the command:

    yarn build

After the compilation is finished copy the folder ```<project's root folder>/src/database/data``` to the location ```<project's root folder>/dist/src/database```

### **ClI engine**
Firstly you must link the application to have global access to make calls to the CLI module, you perform this action by executing the commands below in the project's root folder (with ```sudo``` in Linux):

    yarn link

If the operating system of the environment is linux, the following command is required to give permission to the program:

    chmod +x /usr/local/bin/travel-cli

Now the CLI module is available for access, just use the command below:

    travel-cli input-file.csv

If you prefer, you can replace the ```input-file.csv``` to another CSV with a different route map. To do this, you must place the new file in folder ```<project's root folder>/src/database/data``` and indicate the file name when starting the CLI module.

### **API engine**
At the root of the project use the command below on the terminal to upload a local access server to the API module:

    yarn start

It'll be displayed the address to API documentation, as this url: ```Swagger url: http://localhost:3000/travel-api/doc```. On the page made available by the link, the documentation will be presented in Swagger template, containing a description of the API, in addition to the possibility of interaction with the interface of the same.

## 📝 Tests
With your terminal pointing to the project's root folder, you may use the command below:

    yarn test
All tests located in folder ```<project's root folder>/tests``` will be run automatically and the results will be displayed on the terminal.

## 📐 Architecture
The project was structured using [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) aiming at the following benefits:
- Easier application of the [SoC(Separation of Concerns)](https://en.wikipedia.org/wiki/Separation_of_concerns#:~:text=In%20computer%20science%2C%20separation%20of,code%20of%20a%20computer%20program) concept.
- Better use of code to serve both application access interfaces (CLI and API)
- Fully isolate the software domain from technical details and even external software/services.
- Improves testability.
- Facility for possible exchanges of peripheral technologies.

The code follows [clean Code](http://cleancoder.com/files/cleanCodeCourse.md) concepts, as much as possible, so that the code could be self-documented.

## 📁Organization
The organization of the project folders follows the interaction layers of the [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and it is divided into three main blocks:
- ```<project's root>/src/app``` : Files responsible for both interfaces (API and CLI), in addition to business rules and entities.
- ```<project's root>/src/database``` : Files responsible for interacting with the data storage used by the application.
- ```<project's root>/tests``` : Contains all test files from the previous modules, organized in the same structure as the corresponding file.

### **Entities**
Entities encompass business rules that are universal to application, representing basic entities in their area of expertise.
- ```<project's root>/src/app/domain```

### **Use Cases (Interactors)**
Use Cases (referred to as Application Business Rules) represent each of the application's use cases. Each element of this layer provides an interface to the outermost layer and acts as a central that communicates with other parts of the system.
- ```<project's root>/src/app/infrastructure```
  - **BLL:** Responsible for the organization, validation and application of business rules.
  - **DAL:** Responsible for database requests, such as data manipulation for the application and the database.
  - **Functional:** Responsible for all business rule processing, conversions or validations.
  - **Validations:** Responsible for all typing, structure and rules validation functions.

### **Interface Adapters**
This layer is the border between the application's core and the tools that allow its contact with the external world. Elements in this layer act as mediators: they receive data from one layer and pass it on to another, adapting the data in the most convenient way.
- ```<project's root>/src/app/services```
  - **controllers:** Responsible for validating the typing, integrity and format of the data received by the API.
- ```<project's root>/src/database```
  - **data:** CSV files location.
  - **services:** Responsible for basic interactions (CRUD) with the database.
