#!/bin/bash
docker build -t trpgvore/back .
docker run -p 3000:3000 --rm --name back-trpg trpgvore/back