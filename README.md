# Project Tōhoku 🗾

A bilingual tourism exploration and crowd prediction web application focused on the Tōhoku region of Japan.

Project Tōhoku is my first major programming project.

It started as a small Python terminal program and slowly became the largest and most personal project I have built as a student so far.

The application allows users to explore selected shrines, landmarks, and theaters across Tōhoku while using crowd prediction, recommendation, and visit-planning services.

However, the project became much more than its original technical idea.

I built Project Tōhoku because I genuinely became interested in the Tōhoku region, because I hope to visit it one day, and because I am interested in pursuing graduate study in information science or a computer science related field in Japan.

Tohoku University is one of the universities I am particularly interested in for future graduate study.

Project Tōhoku represents what I can build with the knowledge and information available to me today.

I hope that one day I can build a much better version with real experience in the region, better data, and everything I still have left to learn.

---

## Why I Built Project Tōhoku

I am currently a Bachelor of Computer Applications (BCA) student from India and I have a strong interest in Japan.

When people around me talk about travelling to Japan, the locations I usually hear about are Tokyo, Osaka, and Kyoto.

While learning more about Japan, I became increasingly interested in Tōhoku.

The region's landscapes, shrines, historical locations, cities, and culture caught my attention.

I genuinely want to visit Tōhoku in the future.

At the same time, I have been thinking seriously about continuing my education in information science, applied computing, or a computer science related field.

I am particularly interested in the possibility of applying for graduate study at Tohoku University in the future.

Because of this, Tōhoku did not feel like a random location to use for a programming assignment.

I wanted to build something around a place I was genuinely curious about.

That became Project Tōhoku.

---

## How the Project Started

Project Tōhoku originally began as a Python terminal program.

There was no website.

There were no accounts.

There were no avatars, popups, email verification systems, or Japanese translations.

I used nested Python dictionaries to store shrine information and wrote simple logic to estimate crowd levels.

That was the entire project.

But I kept getting new ideas.

I thought the prediction system would be better if people could actually interact with it through a website.

So I started learning and working with Flask.

Then I thought shrines alone were not enough to represent my idea of Tōhoku.

I added landmarks.

Then I wanted a more modern entertainment side to the project.

I added theaters.

After that, the project continued growing.

Registration.

Login.

Profiles.

Avatars.

History.

Email verification.

Password reset.

Six-digit verification codes.

Persistent sessions.

Japanese language support.

Interactive services.

The project became much larger than I originally planned.

Looking back, that growth is one of my favourite things about Project Tōhoku.

The project changed while I was learning.

---

## I Tried Not to Compromise on My Ideas

One thing that became important to me while building Project Tōhoku was trying not to abandon an idea simply because it became difficult.

I do not mean that the project is perfect.

It is my first major project and I know I still have a huge amount to learn.

But when I had an idea that I genuinely wanted inside Project Tōhoku, I tried to find a way to make it work.
shout out to [CHARAT](https://charat.me/en/) for the amazing designs , they offer for free 

The avatar system is probably one of the best examples.

A profile avatar selector sounds like a small feature.

I spent around three days working on it.

I wanted different avatar categories.

I added Close-Up, Gyaru, Chibi, and Fantasy avatars.

Then the images did not frame correctly.

Some were portraits.

Some were chibi characters.

Some were full-body fantasy characters with wings.

The same CSS scaling did not work for every image.

I could have removed the complicated avatars and used one simple profile icon.

Instead, I kept working on the framing, scaling, hover behaviour, profile display, and avatar selector because I wanted the feature to look the way I had imagined it.

This happened in many parts of the project.

If I wanted email verification, I worked on email verification.

If I wanted six-digit verification codes, I added them.

If I wanted password reset verification, I worked through the flow.

If one service popup behaved differently from the others, I kept adjusting it until the experience became more consistent.

Project Tōhoku contains the features I wanted it to contain.

There are technical limitations and there are things I want to improve, but I do not feel that I knowingly removed an important idea simply because it required more work.

That is something I am personally proud of.

---

## Japanese Localization Was Not Originally the Easy Option

Project Tōhoku includes English and Japanese interface support.

The Japanese interface was not added simply to make the feature list longer.

At one point during development, I thought about the fact that I was creating a project entirely based around a Japanese region while building the interface only in English.

I am building this as an international student, but the project is also about a real region where Japanese people live, travel, and explore.

I thought: if Project Tōhoku is about Tōhoku, why should the interface only be designed for English-speaking users?

So I decided to add Japanese language support.

That decision added more development time than I originally expected.

Existing pages had already been built.

Buttons, menus, profile interfaces, service descriptions, result boxes, registration pages, login flows, verification pages, and newly added popups all needed localization support.

I created a JavaScript translation system using translation keys and added Japanese interface text across the application.

Whenever I later added a new interface, I also had to think about its Japanese version.

The project now supports Japanese throughout its user-facing interface.

Language selection is also available to guests.

I intentionally did not require users to create an account simply to change the language.

Profile customization and avatars require an account, but language accessibility does not.

Adding Japanese localization increased the amount of work required to finish Project Tōhoku.

I still believe it was the correct decision.

It made the project feel much closer to the idea I originally wanted to build.

---

## Visual Design Matters to Me

Although Project Tōhoku is a programming project, I never wanted it to look like a collection of plain forms connected to Python functions.

The images and visual design were always some of my favourite parts of the project.

I wanted the website to feel beautiful to explore.

I spent a lot of time changing image sizes, card layouts, spacing, popup designs, result boxes, profile interfaces, and small visual details.

The major exploration sections each have their own visual identity.

### Shrine Explorer

The Shrine Explorer uses a softer, sakura and cultural-inspired visual style.

### Landmark Explorer

The Landmark Explorer uses a darker navy and explorer intelligence-inspired design.

### Theater Explorer

The Theater Explorer uses crimson and burgundy colours inspired by Japanese cinema.

I wanted users to feel a visual change when moving between the different services while still feeling that everything belonged to Project Tōhoku.

I am not a professional UI designer.

I still have a lot to learn about design, accessibility, and responsive interfaces.

But visual presentation was never an afterthought in this project.

For me, the code needed to work, but the project also needed to be something I personally enjoyed looking at.

---

## ⛩️ Shrine Explorer

The Shrine Explorer was the first major section of Project Tōhoku.

It developed directly from my original Python prototype.

Users can:

- View shrine information
- Check prefecture information
- View recommended visiting times
- Estimate weekday and weekend crowd levels
- Apply weather conditions to crowd estimates
- Explore selected shrine services and cultural information

The shrine logic uses structured Python dictionaries to store supported information.

The Flask backend accesses this information and returns results to the user interface.

The crowd predictor was the original idea that eventually led to the entire Project Tōhoku application.

---

## 🗾 Landmark Explorer

After building the shrine system, I wanted to represent more of Tōhoku.

The Landmark Explorer contains selected destinations and landmarks from the region.

Current services include:

- Landmark information
- Crowd prediction
- Available landmark listings
- Landmark recommendations
- Popularity information
- Visit-planning services

The Landmark Explorer uses a separate Python logic module.

Its interactive services communicate with Flask routes and display returned information through JavaScript-powered result interfaces.

---

## 🎬 Theater Explorer

I added the Theater Explorer because I did not want Project Tōhoku to present the region only through shrines, history, and natural landscapes.

Theater services include:

- Exploring selected theaters
- Viewing theater information
- Checking theater details
- Checking IMAX availability
- Using the "IMAX or Not" service

The Theater Explorer has its own Python logic module and visual identity.

---

## Features I Wanted to Add but Could Not Fully Develop

I had more ideas for Project Tōhoku than the current application contains.

One of the biggest was a hotel and accommodation system.

I wanted users to explore hotels and potentially receive accommodation recommendations.

I also wanted to include significantly more locations across Tōhoku.

The problem I encountered was data.

Finding the name of a hotel or tourism location is easy.

Finding consistent, structured, and reliable information that can support application logic is much more difficult.

Hotel prices change.

Availability changes.

Services change.

Tourism patterns change.

For some locations, I could not find enough consistent information to confidently create the type of service I wanted.

I did not want to invent data just to make Project Tōhoku look larger.

Because of this, I decided not to force some of these features into the first complete version.

This is one area where I believe being physically present in Tōhoku and having access to better information could completely change the project.

I would love to take my own location photographs.

I would love to understand the places in the application beyond internet research.

Most importantly, I would like to work with real ground-level information and reliable tourism data.

The current version of Project Tōhoku was researched and built by me from India.

If I had the opportunity to study in Tōhoku, learn more advanced information science methods, and understand the region directly, I genuinely believe I could make this project many times better than it is today.

---

## Crowd Prediction System

Project Tōhoku currently uses a rule-based crowd prediction system written in Python.

The system considers structured values such as:

- Weekday crowd estimates
- Weekend crowd estimates
- Selected weather conditions

Weather conditions modify the crowd estimate using predefined multipliers.

Rainy weather reduces the estimated crowd significantly.

Cloudy weather moderately reduces the estimated crowd.

Sunny weather keeps the normal crowd estimate.

The resulting value is classified into crowd categories such as low, moderate, or high.

This is not a machine learning system.

It is not connected to real-time visitor counters.

I want to be completely clear about that.

The current system is a student prototype exploring how tourism information and basic decision logic can be combined in a web application.

One of my future goals is to learn how systems like this can use real datasets, statistical analysis, and eventually more advanced prediction methods.

---

## 👤 User Account System

Project Tōhoku includes a Flask-based user account system.

Features include:

- User registration
- Login
- Logout
- Password hashing
- Persistent login sessions
- Email verification
- Password reset
- Six-digit verification codes

Passwords are hashed instead of being stored as plain text.

Sensitive configuration values are loaded through environment variables.

The public repository does not contain my Flask secret key, Gmail credentials, or Gmail application password.

---

## ✉️ Email Verification and Password Reset

New users receive a six-digit verification code through email.

The verification process must be completed before registration is finalized.

The project also contains a password reset flow using email verification.

I wanted these features because I wanted the account system to feel complete.

A simple username and password form would have been easier.

But when I imagined the account experience for Project Tōhoku, email verification and password recovery were part of that idea.

So I built them.

---

## 🎨 Explorer Profile and Avatar System

Registered users have an explorer profile.

Users can update their displayed name and select an avatar.

The current avatar categories are:

- Close-Up
- Gyaru
- Chibi
- Fantasy

Different avatar types use different image framing and scaling behaviour. (very much inspired by Anime) 

The profile system connects the selected avatar to the navigation interface and profile page.

Guests can see that avatar customization exists, but they must register or log in to use the feature.

This was an intentional design choice.

Language selection remains freely available, while personal profile features belong to registered explorers.

---

## 📜 Exploration History

Registered users have access to an exploration history page.

Supported service interactions can be connected to the user's history.

I added this because I wanted Project Tōhoku to feel like an exploration platform rather than a set of unrelated tourism pages.

The history system is still an area I would like to develop further.

---

## Interactive Service Interfaces

The Shrine, Landmark, and Theater services combine:

- HTML
- CSS
- JavaScript
- Flask routes
- Python logic modules
- JSON responses

JavaScript sends requests to Flask routes.

The backend processes the selected service using the relevant Python logic.

Results are returned and displayed through interactive result interfaces without requiring a full page reload.

A large amount of development time was spent making the service popups and result boxes feel visually consistent.

---

## Technologies Used

### Backend

- Python
- Flask
- SQLite
- Werkzeug password hashing
- Python email libraries
- SMTP

### Frontend

- HTML
- CSS
- JavaScript
- Jinja templates

### Development and Design

- Visual Studio Code
- Git
- GitHub
- Figma

---

## Project Structure

```text
Project-Tohoku/
│
├── app.py
├── shrine_logic.py
├── landmark_logic.py
├── theater_logic.py
│
├── static/
│   ├── css/
│   ├── images/
│   ├── blur/
│   └── jss/
│
├── templates/
│   ├── index.html
│   ├── shrines.html
│   ├── landmarks.html
│   ├── theater.html
│   ├── history.html
│   ├── profile.html
│   ├── profile_button.html
│   ├── register.html
│   ├── login.html
│   ├── verify_email.html
│   ├── reset_password.html
│   └── verify_password_reset.html
│
├── .gitignore
└── README.md
```

---

## Running Project Tōhoku Locally

### 1. Clone the Repository

```bash
git clone https://github.com/harshwardhan-shrivastava/Project-Tohoku.git
```

### 2. Open the Project Directory

```bash
cd Project-Tohoku
```

### 3. Install Flask

```bash
pip install flask
```

### 4. Configure Environment Variables

Project Tōhoku expects the following environment variables:

```text
TOHOKU_SECRET_KEY
TOHOKU_GMAIL
TOHOKU_GMAIL_APP_PASSWORD
```

Real passwords and secret keys should never be placed directly inside public source code.

### 5. Run the Application

```bash
python app.py
```

Open the local Flask address displayed in the terminal.

---

## What I Learned

Project Tōhoku taught me much more than I expected.

During development, I worked with:

- Python dictionaries
- Application logic
- Flask routes
- JSON responses
- JavaScript fetch requests
- DOM manipulation
- CSS layouts
- Reusable interface components
- Jinja templates
- SQLite databases
- Password hashing
- Flask sessions
- SMTP email
- Verification flows
- Environment variables
- Git
- GitHub

More importantly, I learned what it feels like to keep working on one idea for an extended period of time.

Many things did not work on the first attempt.

Some features looked terrible before they looked good.

Some fixes created completely different problems.

Small interface details sometimes took hours.

The Japanese localization system increased the amount of work required across the entire application.

The avatar system took days.

The account verification flow required more thought than I expected.

But every time Project Tōhoku moved closer to the version I had imagined, I wanted to keep going.

That experience is probably the most important thing I gained from this project.

---

## The Future of Project Tōhoku

The current application is the first complete version of Project Tōhoku.

It is not the full version of the idea I have in my head.

I want to explore:

- Real tourism datasets
- Ground-level visitor information
- More accurate crowd prediction
- Statistical analysis
- Machine learning methods
- Real-time weather integration
- Hotel and accommodation services
- Transportation information
- Festival and event information
- Seasonal tourism patterns
- More locations across all six Tōhoku prefectures
- Better personalized recommendations
- Saved locations
- Expanded exploration history
- Further Japanese localization improvements
- Mobile optimization
- Accessibility improvements

My biggest limitation at the moment is not a lack of ideas.

It is my current technical knowledge and my access to reliable regional data.

That is one of the reasons I want to continue my education.

If I receive the opportunity to study in Tōhoku, I would love to continue developing Project Tōhoku while actually learning about the region the project represents.

I want to take my own photographs instead of researching every visual from the internet.

I want to understand the locations beyond a webpage.

I want to learn from real information, real datasets, and, if possible, real visitor patterns.

With better technical knowledge and actual experience in Tōhoku, I believe I could make Project Tōhoku one hundred times better than its current version.

Maybe it will always remain my first student project.

Maybe one day it will become something much larger.

I genuinely do not know.

But I know that I want to keep building it.

---

## Author

**Harshwardhan Shrivastava**

Bachelor of Computer Applications Student from India

Interested in Python, Flask, Web Development, Information Science, and Applied Computing.

GitHub: **harshwardhan-shrivastava**

---

## A Final Note

Project Tōhoku is my first major programming project.

I do not believe this is the best work I will ever create.

I hope it is not.

I am still learning, and I intend to become much better at programming, design, data, and information systems.

There are parts of Project Tōhoku that I already know I could rebuild differently with what I have learned during its development.

But I can say that I put my heart into this project.

When I had an idea for Project Tōhoku, I tried to make it possible.

I wanted profiles, so I built profiles.

I wanted avatars, so I spent days working on avatars.

I wanted Japanese localization, even though it increased the amount of work across almost the entire website.

I wanted login, password recovery, email verification, and six-digit codes, so I kept working until those systems became part of the project.

I wanted the project to be visually beautiful to me, so images and design were treated as seriously as I knew how to treat them.

I am not claiming to be at the level of a professional developer.

I am a student building my first major project.

Project Tōhoku is simply the best representation of what I was determined to build at this stage of my life.

If you are a professor, student, developer, or someone who simply found this repository, I would genuinely appreciate it if you took some time to look through what I have built.

This is not my final work.

It is my first.

I intend to keep getting better.

And I hope that one day I can open Project Tōhoku while actually standing somewhere in Tōhoku and begin building the version I could not build from India.

Thank you for taking a look at Project Tōhoku. 🗾