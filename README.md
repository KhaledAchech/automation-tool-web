<div align="center">
    <h1>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noun_project_network_icon_1365244_cc.svg/981px-Noun_project_network_icon_1365244_cc.svg.png" alt="TMC Emblem" height="23px">
        <a>CTNAS</a>
    </h1>
    <h4><b>Clevory Training Networking Automation And Managment Solution</b></h4>
    &copy;Clevory Training
</div>

### (https://clevory.com/)

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noun_project_network_icon_1365244_cc.svg/981px-Noun_project_network_icon_1365244_cc.svg.png" alt="TMC Emblem" alt="CTNAS Logo" height="200px" align="right">

The <b> Clevory Training Networking Automation Solution </b> is an inspiring project, with the goal of creating a single web solution that uses the word automation to it's fullest potentials in all the networking aspects : device implementation, configuration and monitoring.

Offering a single space where network engineers can manage their networks and automate most risky error provoking tasks.

This new solution is developed with [Angular13](https://angular.io/), [HTML5](https://developer.mozilla.org/docs/web/html), [CSS3](https://developer.mozilla.org/docs/web/css), [TypeScript](https://www.typescriptlang.org/), [GoJs](https://angular.io/) for the client side and it is designed to run in any major “evergreen” browser (i.e. Chromium-based [Microsoft Edge](https://www.microsoft.com/edge), [Google Chrome](https://www.google.co.uk/chrome), [Mozilla Firefox](https://www.mozilla.org/firefox), [Apple Safari](https://www.apple.com/safari) or [Opera](https://www.opera.com/)), desktop or mobile, without issue.

For the server side, we worked with [SpringBoot](https://spring.io/projects/spring-boot), [Java](https://www.java.com/en/), for the structured relational data we used the [SQL](<https://www.techtarget.com/searchdatamanagement/definition/SQL#:~:text=Structured%20Query%20Language%20(SQL)%20is,on%20the%20data%20in%20them.>) database [MySql](https://www.mysql.com/), for the [NoSQL](https://www.mongodb.com/nosql-explained) database we used [RethinkDB](https://rethinkdb.com/).

Also our server is connected with a python script luncher that will handle most of the automation scripts written in [Python](https://www.python.org/) and using the [Netmiko](https://www.packetcoders.io/netmiko-the-what-and-the-why/#:~:text=netmiko%20is%20a%20multi%2Dvendor,facto%20SSH%20library%20in%20Python.) module to make the connections between the devices.

## Table of contents

- [Roadmap](#roadmap)
  - [Content](#content)
  - [Features](#features)
- [Development guide](#development-guide)
  - [Technical](#technical)
  - [Client](#client)
  - [Server](#server)
  - [Prerequisites](#prerequisites)
    - [Clone](#clone)
    - [Configure](#configure)
  - [Running the website locally](#running-the-website-locally)
- [User guide](#user-guide)
  - [Sign in](#sign-in)
  - [Tenant View](#tenant-view)
  - [Topology View](#topology-view)
  - [Editor View](#editor-view)
  - [Device View](#device-view)
  - [Interface View](#interface-view)
  - [Protocol View](#protocol-view)
  - [User View](#user-view)
  - [Profile View](#profile-view)
  - [Help View](#help-view)
- [Copyright](#copyright)

## Roadmap

This is a non-exhaustive list of the things we wouldd like to add in future development, in no particular order. This is obviously subject to change, but it should be a good indication of what’s to come. we will tick things off as and when they get done. we want to eventually get to a stage where we ve provided enough tooling so that most of the content can be published by other people, so that we're freed-up to work primarily on adding new features.

### Content

- Tenant managment.
- Topology managment.
- Topology editor.
- Assigning devices to topologies.
- Devices managment.
- Interfaces managment.
- Displying start-up and running configuration and highlighting the differences between them.
- Showing device neighbors and creating connections between them.
- Protocols managment.
- Users managment.
- Updating profiles.
- Authentication && Authorisation.
- Requests filters.
- Errors and exceptions redirections.
- Access limitations.
- Roles managment.

### Features

Features that will be added in the future :

- Filling up the device interfaces and protocols automaticaly.
- Fetching the device neighbors ip addresses automaticaly.
- Configuration managment : being able to save configurations or roll back to older versions.
- Traffic Engineering.
- Segment Routing.
- Policies and templates.
- Device Credentials managment.
- New users validation email.
- Adding a FAQ system.
- Upgrade the automation feature to an ansible playbook.
- Monitoring the network devices states, interface speed, etc.

## Development guide

## User guide

<!-- I’ve tried to write this readme in such a way that those who aren’t necessarily familiar with coding have a fighting chance of contributing to the website’s development if they’re so inclined; such as club members. As such, if you’re already a developer, some of these instructions may seem a little overly-verbose, so you can probably skip some elements. Conversely, if you’re not too tech-savvy, I recommend reading everything if you want to be able to help us out with the site – incidentally, you’re absolutely welcome here whatever level of experience (if any), hence why I’ve tried to be as explicit as possible with instructions, so please don’t feel put-off if it looks overwhelming! [Send me an email](#contact) if you’d like to get involved but could do with a hand getting started, and I’d be happy to get you going.

### Prerequisites

For the most part, these are the bare-minimum requirements for getting up-and-running.

#### Microsoft Windows

While not _strictly_ a requirement, I personally develop on [Windows](https://en.wikipedia.org/wiki/Microsoft_Windows) myself so, naturally, this guide is tailored to getting a development environment established on a Windows PC. If you _are_ on Windows then I highly recommend upgrading to [Windows 10](https://en.wikipedia.org/wiki/Windows_10) if you haven’t already done so:

- _Get Windows 10 here:_ https://www.microsoft.com/windows/get-windows-10
- _Upgrade FAQ:_ https://support.microsoft.com/help/12435/windows-10-upgrade-faq

I have no problem with contributors developing using macOS or Linux assuming you know what you’re doing and stick to Windows-style [line endings](https://en.wikipedia.org/wiki/Newline) (`CR+LF`). I may expand these instructions in future if there’s enough demand for people wanting to develop on other platforms – feel free to submit a pull request yourself to update the readme with said instructions if you’re one such developer!

#### Git for Windows

[Git](https://en.wikipedia.org/wiki/Git) is what’s known as a [version control system](https://en.wikipedia.org/wiki/Version_control) (VCS) and it’s what millions of developers the world over use every day to manage their codebases. It provides a comprehensive history of changes made to the source code repository as well as tools to help multiple developers work together on the same codebase remotely from potentially anywhere on the planet. The new Triumph Mayflower Website is currently being developed using Git as its VCS to provide a solid backbone for our development process. Follow these steps to install Git for Windows:

1. Download and run the Git for Windows installer from their website:
   - https://www.gitforwindows.org/
2. On the _“Adjusting your PATH environment”_ page, select _“Git from the command line and also from 3rd-party software”_.
3. On the _“Choosing HTTPS transport backend”_ page, select _“Use the OpenSSL library”_.
4. On the _“Configuring the line ending conversion”_ page, select _“Checkout as-is, commit as-is”_.
5. Complete the rest of the setup wizard.

#### GitHub setup

The website’s source code is hosted on [GitHub](https://en.wikipedia.org/wiki/GitHub) (the website you’re currently reading this on). In order to download and alter the source code, you’ll need to sign-up for a GitHub account:

1. Go to https://www.github.com/.
2. On the GitHub homepage, choose a username and enter an email address and password, then click _“Sign up for GitHub”_.
3. Follow the instructions on the next page to verify your account, then click _“Join a free plan”_.
4. Enter the most applicable options for you on the _“Welcome to GitHub”_ page.
5. Check your emails for a verification email (make sure it’s not in your “junk”/“spam” folder) and click the _“Verify email address”_ link.
6. Load Git Bash and run the following command – entering an empty passphrase is fine.
   - `ssh-keygen`
7. Copy the contents of the public SSH key file that was generated to the clipboard by running:
   - `cat ~/.ssh/id_rsa.pub > /dev/clipboard`
8. Back on the GitHub website, click the user icon in the top-right corner followed by _“Settings”_.
9. On the left-hand menu, click _“SSH and GPG keys”_ followed by _“New SSH key”_.
10. Paste the contents of the clipboard into the _“Key”_ field and click _“Add SSH key”_.
11. Your Git Bash client will now automatically authenticate you when you’re communicating with GitHub through the said client—in other words, you won’t need to enter a username and password every time you try to interact with it!

#### Local repository

For those unfamiliar, a Git [_“repository”_](<https://en.wikipedia.org/wiki/Repository_(version_control)>), or _“repo”_ for short, is a set of source code files (usually stored on a centralised _“remote”_ server somewhere) alongside specific Git-managed metadata files which contain information about where the remote server can be found on the internet (or local network), various pieces of configuration information and, **most importantly**, a _complete_ history tree of all changes made to the codebase – what specific changes were made at each stage, when they were made, who made them and how they were integrated back into the primary flow of code from temporary _“branches”_ where developers can work on isolated copies of the code without interfering with other devs working on the same codebase.

##### Clone

In order to make changes to the website and see the effect those changes have, you’ll need to download the source code to your local machine in what’s called a _“clone”_ operation. This will download a copy of the source code repository to your file system and allow it to be managed by Git:

1. Create a directory (folder) somewhere on your filesystem without any space characters in the path (a common convention among developers is `C:\dev`; I personally keep my repos in `C:\Development\Repositories`).
2. Load Git Bash and enter the following command to change the working directory to the newly-created folder (assuming you chose `C:\dev`):
   - `cd /c/dev`
3. Clone the website repository by entering the following command:
   - `git clone git@github.com:Stack-in-a-box/triumphmayflowerclub.com.git`
4. When asked whether you want to continue connecting to GitHub, type `yes` and hit _[Enter]_.
5. Once the clone operation has finished, enter the following command to change the working directory to the root directory of the local repository:
   - `cd triumphmayflowerclub.com`

##### Configure

When you’ve downloaded a local copy of the repository, you need to configure Git such that it automatically credits you as the author of any code changes you make:

1. Set your name by running the following command and replacing `<name>` with your first and last name:
   - `git config --local user.name "<name>"`
2. Set your email address by running the following command and replacing `<email>` with the email address you used to register your GitHub account with (you don’t need the quotes either side of the email address like with setting your name in the previous step, as it won’t contain any spaces):
   - `git config --local user.email <email>`

#### Jekyll

[Jekyll](https://www.jekyllrb.com/) is what’s known as a [_“static site builder”_](https://en.wikipedia.org/wiki/Web_template_system#Static_site_generators). It allows us to reduce the amount of repeated code throughout the codebase, by _“factoring”_ the commonly used parts of a page (such as the title image, navigation bar, page footer, primary styles, etc.) into single files which are simply referenced in specific pages; then, when Jekyll is run to _“build”_ the site, it will re-insert the factored-out code into each of the source files that reference it, creating a reconstructed set of files which can then be deployed to the live server and opened in a web browser.

_(**Note:** At the time of writing, which is July 2020, Jekyll doesn’t fully support [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/wsl2-index), as it doesn’t receive all file-system update events which are required for the `jekyll serve` feature that allows for automatically-triggered rebuilding whenever source files change, so stick to WSL 1 for the time being.)_

1. Open an elevated [PowerShell](https://en.wikipedia.org/wiki/PowerShell) instance by searching for _“powershell”_ in the search box on the taskbar (assuming Windows 10) then pressing _[Shift + Enter]_ to run it as an administrator.
2. Enable the [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-gb/windows/wsl/about) feature by running the following command in the elevated PowerShell prompt and reboot when prompted to do so:
   - `Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
3. Open the Microsoft Store, search for the [Ubuntu](https://www.ubuntu.com/) app, install it and then click _“Launch”_ once it’s installed.
4. The app, once open, will take a few minutes to perform some initial under-the-hood set-up…
5. When prompted, enter a username and password to use when dealing with WSL (doesn’t have to be the same as your Windows login credentials).
6. At the [`bash`](https://en.wikipedia.org/wiki/Bash_%28Unix_shell%29) prompt, which should look something like `<username>@<machine>:~$`, run the following command to update the list of packages that can be installed and repositories to install them from (enter your UNIX password when prompted). This will take a while to complete:
   - `sudo apt-get update -y && sudo apt-get upgrade -y`
7. Install [Ruby](https://www.ruby-lang.org/en/) by running the following 4 commands one after the other:
   - `sudo apt-add-repository ppa:brightbox/ruby-ng` (press _[Enter]_ to confirm)
   - `sudo apt-get update`
   - `sudo apt-get install ruby2.7 ruby2.7-dev build-essential` (enter _“Y”_ when asked)
   - `sudo gem update`
8. Finally, install Jekyll by running the following:
   - `sudo gem install jekyll`

### Running the website locally

Once Jekyll has finished installing, in an Ubuntu terminal session, and assuming you chose `C:\dev` as your location for storing your repositories, perform the following steps to spin-up a local development server instance:

1. Change the working directory to the root directory of the local repository by entering the following command:
   - `cd /mnt/c/dev/triumphmayflowerclub.com`
2. Run Jekyll in _“watch”_ mode, so that it rebuilds the site whenever the source files change, by issuing the following command:
   - `jekyll serve`
3. Wait a little while for the initial build to take place, then `Server running... press ctrl-c to stop.` will be displayed. At this point, open a web browser and navigate to http://localhost:4000/ to view the website running locally from your local copy of the source code.
4. Whenever you make changes to a file and save it, Jekyll will pick-up on this and automatically trigger a new build. To see your changes in your locally-hosted site, look in the terminal and wait for the regenerating to complete (`...done in x seconds.` will be shown, where `x` is the number of seconds it took to generate the new changes). At this point, you can refresh the page loaded in your browser and the changes will appear on the site.

_(**Note:** Jekyll doesn’t always notice when brand new files are created, so if you refresh your browser and the page isn’t accessible, try closing Jekyll and running it again, and the new page should then be included in the build.)_

### Recommended tools

I’ve recommended some tools you may want to use for development. None of these are required, they just might make working on the site easier.

#### Chromium-based browser

You’ll need a web browser, preferably a [Chromium](https://www.chromium.org/)-based one, such as [Microsoft Edge](https://www.microsoft.com/edge) (included with Windows 10) or [Google Chrome](https://www.google.co.uk/chrome), in order to test any changes you make to the website before committing them to the codebase.

#### Visual Studio Code

If you’re going to be modifying the website’s source code, you’ll need a good [text editor](https://en.wikipedia.org/wiki/Text_editor). I recommend using Visual Studio Code as it’s modern, lightweight, cross-platform and has many features that you’d usually find in a fully-fledged [IDE](https://en.wikipedia.org/wiki/Integrated_development_environment) such as [syntax highlighting](https://en.wikipedia.org/wiki/Syntax_highlighting), [code completion, IntelliSense](https://en.wikipedia.org/wiki/Intelligent_code_completion) and a large ecosystem of plugins. For simple website development using vanilla HTML, CSS and very occasional JavaScript, it should work extremely well out of the box without any configuration changes or additional plugins:

1. Download and run the Visual Studio Code installer from their website:
   - https://code.visualstudio.com/
2. Continue through the installation wizard until the end. The default options are fine.

#### Microsoft Word

Not a necessity but it can be useful when authoring news articles or content for inclusion on the site, as it automatically adds typographical [Unicode](https://home.unicode.org/) characters that are required by our code standards (to be documented at some point in the future), such as [_“smart quotes”_](https://en.wikipedia.org/wiki/Quotation_marks_in_English#Smart_quotes), [en dashes](https://en.wikipedia.org/wiki/Dash#En_dash), etc. The full version of [Word](https://www.microsoft.com/microsoft-365/word) is obviously paid software as part of the Office suite of applications, but there are plenty of decent, free, open-source alternatives that offer similar functionality.

#### Adobe Photoshop

[Photoshop](https://www.adobe.com/photoshop) is what I use for photo editing, but most editors should do a good job of simple editing tasks.

### Contributions

My vision for this project, as it evolves, is that it will start to attract a small core team of developers and non-technical contributors, such that it becomes a great place where those wanting to get their hands dirty with some open-source website development can do so. Having more team members will also free me up to work on feature additions, major refactors and integrating new technologies.

Eventually, it would be great if I had time to develop a simple, bespoke set of CMS-style authoring tools that would let non-technical club members author and submit news articles and other content for inclusion on the site with minimal or even zero technical intervention. As it stands, the site will need manually updating by technically-minded folk for the foreseeable future, but hopefully we’ll get to this stage someday.

## Deployment

To deploy either the staging or live site, perform the following:

1. Make sure your local repository is in a clean state and that the changes to be deployed are checked-out.
2. Issue the following command in Ubuntu to build the source code:
   - `jekyll build`
3. Download and install [WinSCP](https://www.microsoft.com/store/productId/9P0PQ8B65N8X) from the Microsoft Store.
4. When prompted, enter the following details into the _“Session”_ pane:
   - **File protocol** – _SFTP_
   - **Host name** – _triumphmayflowerclub.com_
   - **Port number** – _22_
   - **User name** – _(Obtain from a website admin)_
   - **Password** – _(Obtain from a website admin)_
5. Say _“Yes”_ when WinSCP asks if you’re okay connecting to an unknown server and adding its host key to a cache.
6. In the left-hand panel, navigate to the `_site` directory in the root of your repo, as this is where Jekyll places the output from the site generation process.
7. In the right-hand panel, navigate to either the `beta.triumphmayflowerclub.com` or `public_html` subdirectory, depending on whether you’re deploying to the staging or live site respectively.
8. In the right-hand panel, delete `index.html` and rename `updating.html` to `index.html`. Ideally, this would be an atomic operation to minimise the risk of someone being unable to load the homepage, but the timeframe in which this happens and the relatively few people accessing our website mean that this isn’t really an issue in practice. This will be addressed properly once we start using GitHub Actions for continuous deployment.
9. Select all files in the left-hand source panel, with the exception of `index.html`, and drag them across to the right-hand destination panel.
10. Click _“Yes”_ when prompted to begin the file transfer.
11. When asked to confirm whether overwriting is okay, click the small downwards arrow on the right-hand side of the _“Yes”_ button and click _“Newer only”_. This will begin the transfer.
12. Once this transfer has completed, copy `index.html` from the source panel to the destination one to overwrite it. The deployment is now complete. -->

## Copyright

Copyright © Clevory Training 2022.
