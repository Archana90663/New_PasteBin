# Pastebin 2.0

The current PasteBin has gotten too bulky and doesn't have any searching capabilities. Pastebin 2.0 is a less clunky (minimalistic) version.

## Collaborators
[Archana Dhyani](https://github.com/Archana90663) (Front-end)

[Blas Kojusner](https://github.com/bkojusner) (Front-end)

[Param Gupta](https://github.com/paramgupta107) (Back-end)

[Sudhanshu Tarale](https://github.com/SudhanshuTarale) (Back-end)

## Tech Stack ##
* Front-end:
  * Angular(latest) with TypeScript
     Libraries to use: Angular material - https://material.angular.io/
* Back-end:
  * Golang
  * Embed
  * Gorm
  * SQLite

## Index
- [Features](#Features)
- [How to use](#Exploring-the-repository-of-pastes)
  - [Exploring the repository of pastes](#Exploring-the-repository-of-pastes)
  - [Open a paste](#Open-a-paste)
  - [Create a paste](#Create-a-paste)
    - [How to add expiry to paste](#How-to-add-expiry-to-paste)
  - [How to share the created paste](#How-to-share-the-created-paste)
  - [What if you try to open an expired paste link](#What-if-you-try-to-open-an-expired-paste-link)
 - [How to run the app](#How-to-run-the-app)
    - [Build app without make on windows](#Build-app-without-make-on-windows)
- [Run the app without building](#Run-the-app-without-building)
  - [Run without make on windows](#Run-without-make-on-windows)
- [Backend API documentation](https://github.com/Archana90663/New_PasteBin/wiki/Routes)
## Features

- The home page provides a list of all pastes so that users can explore
- other pastes(with search functionality comming in the future). The
-  ability to set expiry for pastes. Ability to get sharable link of
-  pastes. A rich text editor for formatting your pastes

## Exploring the repository of pastes

The home page contains a repository of all pastes there to explore. 
The latest pastes are within cards. 
The cards each contain the `user` who made the paste, their `@`, and other metadata such as when the paste was `created` and when it will `expire`, as well as the title and preview of the content of the paste itself. 

![](https://i.imgur.com/SImOcne.gif)

## Open a paste
A user can interact with each of the previewed pastes by clicking on the `READ` button within each of the cards to open the paste. 

![](https://i.imgur.com/KAvN5bm.gif)

## Create a paste

Simply click the `new paste` button on the navbar, and fill the form.

![](https://i.imgur.com/ArnBlJA.gif)

>*Constraints for pastes*:-<br/>
The title must not be empty.<br/>
The title must not be more than 260 charscters<br/>
The body must not be empty<br/>
The body must not be more that 10,00 characters<br/>
The expiry date is optional.<br/>
The expiry must not be before the current time.<br/>
### How to add expiry to paste<br/>
While creating the paste, there is a DateTime field where you can select the expiry.<br/>

![](https://i.imgur.com/7es49O7.gif)


## How to share the created paste
Once the paste is created you will be redirected to the page of that particular text, where you simply copy the link and share it.

![](https://i.imgur.com/Z8T9jDz.gif)

You can also share a paste you open from the homepage in a similar way.
## What if you try to open an expired paste link
If you try to open the link of an expired paste, it will display an error message showing the paste has expired.

![](https://i.imgur.com/iQwPj6L.gif)

## Login to PasteBin
Users have the ability to login to our application using the Google Login API. This is for users who want to create private pastes as well

![](https://imgur.com/a/6UpIwXB.gif)

## How to build the app
If your target machine is not supported by the executable in the releases section, first you will have to build the app.
First make sure you have all the requirements installed.
>Requirements:-<br/>
NodeJs<br/>
@angular/cli<br/>
Golang<br/>

To build the app open your terminal and run the following
```
cd New_PasteBin
make install
make build
```
This will create an executable file in the directory `New_PasteBin/Server`. The file will be named `server`. 

### Build app without make on windows.
First, we have to install all node dependencies
```
cd new_pastebin_frontend
npm install
cd ..
```
Then we run the powershell script :- `build.ps1`
## How to run the app
After you build the app or download it from releases, simply execute the executable. This will run the server that will listen to requests on port `8080`.
The homepage of the app will be at `localhost:8080/`

### Run the app without building
If you want to run the app without building (useful in the development process), do the following.
First, make sure you have all the requirements installed.
>Requirements:-<br/>
NodeJs<br/>
@angular/cli<br/>
Golang<br/>

The execute the following commands in terminal(one-time setup)
```
cd New_PasteBin
make install
```
Finally to run the app, execute
```
make run
```
This will host the front end on port `4200`. The homepage will be at `localhost:4200`.
The backend will run parallelly on the port `8080`

#### Run without make on windows
First, we have to install all node dependencies
```
cd new_pastebin_frontend
npm install
cd ..
```
Then we run the powershell script :- `run.ps1`

## Back-End
Refer [this](https://github.com/Archana90663/New_PasteBin/wiki/Routes) for the API documentation
