# PFAS Dashboard

## 🚧 Development

This is a React app developed with Node 20.11.1.

### Environment Variables

Create `.env` from `sample.env` and fill in the missing values.

### Development Server

Install dependencies with `npm i`, and spin up the development server with `npm start`.
The app should be running at [http://localhost:8080/](http://localhost:8080/).

## 📦 Building for Production

### Manually

Execute `npm ci` to install locked dependencies, and `npm run build` to build a production bundle. The bundle will export to the `dist` directory.

### With Docker

There's a Dockerfile for easy deployment.
Commands similar to the following should suffice to build an image
and run an NGINX container that serves only the application bundle on port 80.

```bash
docker build -t pfas-dashboard:1.0.4 . \
docker run --rm -p 80:80 pfas-dashboard:1.0.4
```

## 🚢 Deployment

### 🖥 Host VM

This application is deployed in ACIS-managed UNC virtual machines at [pfas-app-dev.renci.unc.edu](https://pfas-app-dev.renci.unc.edu) and [pfas-app-prod.renci.unc.edu](https://pfas-app-prod.renci.unc.edu).

### 🪪 VM Access

Being in the RENCI group on the [UNC VPN](https://vpn.unc.edu) is required to view the dev deployment of the application in your browser. The prod instance, on `pfas-app-prod` is accessible to the public Internet.

VPN access is required for SSH, though, for both machines. SSH

```
ssh <ONYEN>@pfas-app-dev.mdc.renci.unc.edu
```

> [!NOTE]
> Note the `mdc` appearing in this address.

You will be prompted to authenticate with your ONYEN unless you've configured key-based authentication.

### 🔑 SSL

SSL certificate and key files are on the VM and maintained by ACIS, who will be notified of expiry and will manage replacement.

We will need to mount the aforementioned certificate files from the host VM into the container. NGINX [will look for](./server.conf) `ssl.cer` and `ssl.key` in `/`.

### 🚀 Launching the application container

The entire command to bring up the application, say `v0.1.10`, looks like:
```
docker run --rm -d \
  -p 80:80 -p 443:443
  -v <PATH_TO_CERT>:/ssl.cer
  -v <PATH_TO_KEY>:/ssl.key
  --name pfas-ui pfas-dashboard:0.1.10
```
