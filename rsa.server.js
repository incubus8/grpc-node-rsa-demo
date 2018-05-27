const PROTO_PATH = __dirname + '/protos/rsa.proto';

const  NodeRSA = require('node-rsa');

const grpc = require('grpc');
const rsa_proto = grpc.load(PROTO_PATH).rsa;

function getRsaKeyPair(call, callback) {
  console.log('Generate ', call.request.key_size, 'bit RSA')

  const key = new NodeRSA();
  key.generateKeyPair();

  callback(null, {
    key_size: key.getKeySize(),
    private_key: key.exportKey('private'),
    public_key: key.exportKey('public')
  });
}

function main() {
  const server = new grpc.Server();
  server.addService(rsa_proto.Rsa.service, {getRsaKeyPair: getRsaKeyPair});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
