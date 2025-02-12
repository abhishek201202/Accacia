## Steps To Run The Code: 
# 1. Run the following command to start server
```bash
npm i express
npm i axios
npm i pdf-lib
```

# 2. After installation run this command to start the server
```bash
node server.js
```

# 4. Curls to test the Apis

## 4.1 Scrape Form data given pdf url
```bash
curl -X POST "http://localhost:3000/extract-pdf-data" \
     -H "Content-Type: application/json" \
     -d '{"pdfUrl": "https://example.com/sample.pdf"}'
```

