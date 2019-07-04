#!/bin/bash
docker build -t trpgvore/back .
docker run -p 9091:3000 trpgvore/back