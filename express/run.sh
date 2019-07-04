#!/bin/bash
docker build -t trpgvore/back .
docker run -p 9091:3001 -d trpgvore/back