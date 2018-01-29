## What you'll need?

- [Ruby](https://www.ruby-lang.org/en/downloads/)
- [NodeJS](https://nodejs.org/)
- [Global header & footer](https://bitbucket.org/910ths/nine10ths-components)

## Jekyll installation:

1. Clone this repository or download it into a directory of your choice.
2. Open Ruby console.
3. Run command `gem install jekyll bundler`.
4. Go to root directory of your project.
5. Run command `bundle install` *(reference: Gemfile)*.

## How to locally running project?

1. Open Ruby console.
2. Go to root directory of your project.
3. Run command `bundle exec jekyll serve`.
4. Open in your browser: `http://localhost:4000`.

## Gulp installation:

1. Open Node.js console.
2. Go to `gulp` directory in root directory of your project.
3. Run command `npm install` *(reference: package.json)*.

## How to edit project?

1. Open Node.js console.
2. Go to `/gulp` directory of your project.
3. Edit files:

  * `.scss` in `/_dev/scss` directory
  * `.js` in `/_dev/js` directory

4. Run command `gulp` *(reference: gulpfile.js)*.
5. Output files will be saved in below files:

  * `/build/css/styles.css`
  * `/build/js/scripts.js`