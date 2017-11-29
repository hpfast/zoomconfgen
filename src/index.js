//load a mapproxy.yaml and seeds.yaml and a layer config description file, and generate configs with caches split up per zoom level
let fs = require('fs');
let yaml = require('js-yaml');
let seeds = require('./seeds');
let caches = require('./caches');
let layers = require('./layers');
let sources = require('./sources');
let args = require('./argparse')();


let conf = {};
conf.srs = ['EPSG:28992'];

['layer_config', 'mapproxy_config', 'seed_config'].forEach(arg => {
    if (args[arg]) {
        try {
            conf[arg] = yaml.load(fs.readFileSync(args[arg], 'utf-8'))
        } catch (err) {
            handleArgError(arg, err)
            process.exit(1);
        }
    }
})


function handleArgError(target, err) {
    console.error('error parsing layer_config');
    console.error(err);
}




module.exports = function() {
    conf.mapproxy_config.sources = sources(conf.layer_config, conf)
    conf.mapproxy_config.layers = layers(conf.layer_config)
    conf.mapproxy_config.caches = caches(conf.layer_config)
    conf.seed_config.seeds = seeds(conf.layer_config)
    if (args.mapproxy_output) {
        fs.writeFileSync(args.mapproxy_output, yaml.dump(conf.mapproxy_config), 'utf-8')
    }
    if (args.seed_output) {
        fs.writeFileSync(args.seed_output, yaml.dump(conf.seed_config), 'utf-8')
    }

    if (args.stdout) {
        console.log(JSON.stringify(conf.mapproxy_config, null, 2))
    }
}
