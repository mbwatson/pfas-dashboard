# PFAS Dashboard

## Development

This is a React app developed with Node 20.11.1.

### Environment Variables

Create `.env` from `sample.env` and fill in the missing values.

### Development Server

Install dependencies with `npm i`, and spin up the development server with `npm start`.
The app should be running at [http://localhost:8080/](http://localhost:8080/).

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

## Deployment

### SSL

Mount the certificate and key files from the host VM into the container. NGINX [will look for](./server.conf) `ssl.cer` and `ssl.key` in `/`, so the entire command to bring up the application, say `v0.1.10`, looks like:
```
docker run --rm -d \
  -p 80:80 -p 443:443
  -v /data/certs/pfas-app-dev_renci_unc_edu.key:/ssl.key
  -v /data/certs/pfas-app-dev_renci_unc_edu.cer:/ssl.cer
  --name pfas-ui mvvatson/pfas-dashboard:0.1.10
```