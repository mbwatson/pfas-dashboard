# PFAS Dashboard

## Development

This is a React app developed with Node 20.11.1.

### Environment Variables

Create `.env` from `sample.env` and fill in the missing values.

### Development Server

Install dependencies with `npm i`, and spin up the development server with `npm start`.
The app should be running at [http://localhost:8080/](http://localhost:8080/).

### Generating Data

Use `npm run generate -- [OPTIONS]` to generate synthetic data.

- generate and write 100 records: `npm run generate -- --number 100`
- generate and write 100 records across 3 datasets: `npm run generate -- --number 100 --datasets 3`
- generate and do not write 100 records across 3 datasets: `npm run generate -- --pretend --number 100 --datasets 3`

There are aliases:
- '-v': '--verbose'
- '-p': '--pretend'
- '-n': '--number'
- '-d': '--datasets'

Thus the last command can be shortened to `npm run generate -- -p -n 100 -d 3`.

## Building for Production

### Manually

Execute `npm ci` to install locked dependencies, and `npm run build` to build a production bundle. The bundle will export to the `dist` directory.

### With Docker

There's a Dockerfile for easy deployment.
Commands similar to the following should suffice to build an image
and run an NGINX container that serves only the application bundle on port 80.

```bash
docker build -t pfas-dashboard/client:1.0.4 . \
docker run --rm -p 80:80 pfas-dashboard/client:1.0.4
```
