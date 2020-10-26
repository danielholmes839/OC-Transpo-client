# stop-checker.com

[stop-checker.com](https://www.stop-checker.com) is website created using React that uses my [OC Transpo GraphQL API](https://github.com/danielholmes839/OCTranspo-GraphQL).

## Next Time...

The code for this website is a disaster. I don't use React that often. I made a lot of bad decisions when choosing how I should style, and structure my code.
I originally start this project using just bootstrap. Eventually I decided I should switch to react-bootstrap so I could control the bootstrap elements with react.
I ended up not switching entirely and was left with very confusing react-bootstrap mixed in with bootstrap classes. To make things worse I got very lazy and used a lot
of inline styles using the style prop. This didn't make the code look too nice. I also started this project not know that I should use absolute paths - that was a big mistake.
I didn't make use of apollo fragments to ensure that my components are getting the correct data. My error handling is messy. I could have made better components in general.
