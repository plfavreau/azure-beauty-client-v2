## Getting Started

- Create the inference app image

```bash
docker build -t azure .
```

- Run the image in a Docker container

```bash
docker run -p 8080:80 azure
```

- Install project dependencies

```bash
npm i
```

- Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
