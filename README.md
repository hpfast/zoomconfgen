zoomconfgen
===========

For configuring Mapproxy with a cache per zoom level. Since for this setup you need a lot of configuration file, these are some scripts to help generate the config automatically.

Takes an input `mapproxy.yaml` and `seed.yaml`, and a `layers.yaml` which contains the definitions of layers and zoom levels you want to configure. The `mapproxy.yaml` and `seeds.yaml` could be a real existing one you want to convert, or they could be minimal ones with stub properties. In the latter case, they need to be complete except for the `layers, caches, sources` and the `seeds` objects respectively. This script will fill those in based on your `layers.yaml` file. See the example `layers.yaml` which contains some comments documenting the available options.

Note that these scripts generate couchdb cache backends, since that is what we are using. If you want to use a different type of backend, you will have to modify `sources.js`.

Installation
------------

You can install this as a standalone command-line program with `npm install -g zoomconfgen`. Or you can run this as a Docker container:

    docker run --rm hpfast/zoomconfgen [arglist]

Usage
-----
"""
Usage: zoomconfgen [-h] [-v] [-c MAPPROXY_CONFIG] [-s SEED_CONFIG]
                [-l LAYER_CONFIG] [--mapproxy-output MAPPROXY_OUTPUT]
                [--seed-output SEED_OUTPUT] [-o]
                

convert mapproxy config files to split up caches by zoom level

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -c MAPPROXY_CONFIG, --mapproxy-config MAPPROXY_CONFIG
                        the input mapproxy config file you want to convert
  -s SEED_CONFIG, --seed-config SEED_CONFIG
                        the input seed file you want to convert
  -l LAYER_CONFIG, --layer-config LAYER_CONFIG
                        the config file with layers and zoom levels to 
                        configure
  --mapproxy-output MAPPROXY_OUTPUT
                        name of the mapproxy.yaml output file.
  --seed-output SEED_OUTPUT
                        name of the seed.yaml output file.
  -o, --stdout          write to stdout
"""
