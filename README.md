
# A College Selector

The project is a frontend assignment test, where there is a search bar and a drop down menu which searches the name of the colleges, and also on selection displays the college logo and it's name separately.





## Project Setup

Setting up the project.

```bash
  git clone https://github.com/JTiscodin/College-Selector.git

  cd College-Selector

  npm install

  //And you are good to go.
```
    
### API used in the project 
```bash
http://universities.hipolabs.com/search?name=${name} => for getting university list

https://logo.clearbit.com/${domain} => for getting logo from their Web Pages

```

## Deployment

The problem with deployment 

- The fact that hipolabs is serving the api on http instead of https, prevents platforms like Vercel and Netlify to fetch data, so no data is returned and hence the fetch fails

- Possible solution, have a backend in node.js that serves the data through https, but the project is too small to implement something like this




## Demo

The Demo is mentioned below:



https://github.com/JTiscodin/College-Selector/assets/113091818/1bd6c6b0-9d48-45b1-a719-087d9e6df527

