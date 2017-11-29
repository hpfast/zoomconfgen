let ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
      version: '0.0.1',
      addHelp:true,
      description: 'convert mapproxy config files to split up caches by zoom level'
});
parser.addArgument(
    [ '-c', '--mapproxy-config' ],
    {
        help: 'the input mapproxy config file you want to convert'
    }
);

parser.addArgument(
    [ '-s', '--seed-config' ],
    {
        help: 'the input seed file you want to convert'
    }
)
parser.addArgument(
    [ '-l', '--layer-config' ],
    {
        help: 'the config file with layers and zoom levels to configure'
    }
)
parser.addArgument(
    [ '--mapproxy-output' ],
    {
        help: 'name of the mapproxy.yaml output file.'
    }
)
parser.addArgument(
    [ '--seed-output' ],
    {
        help: 'name of the seed.yaml output file.'
    }
)
parser.addArgument(
    [ '-o', '--stdout' ],
    {
        action: 'storeTrue',
        help: 'write to stdout'
    }
)

module.exports = function() {
    return parser.parseArgs();
}

