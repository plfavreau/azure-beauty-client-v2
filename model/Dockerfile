FROM python:3.9-slim

RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libhdf5-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir "flask<3" "pillow<11" "numpy<2" tensorflow~=2.13.0 flask-cors

COPY app /app
EXPOSE 80
WORKDIR /app

CMD ["python", "-u", "app.py"]
