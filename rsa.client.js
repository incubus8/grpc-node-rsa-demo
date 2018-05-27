const PROTO_PATH = __dirname + '/protos/rsa.proto';

const grpc = require('grpc');
const rsa_proto = grpc.load(PROTO_PATH).rsa;

function main() {
  const client = new rsa_proto.Rsa('localhost:50051', grpc.credentials.createInsecure());
  const keySize = 4096;
  client.getRsaKeyPair({key_size: keySize}, function(err, response) {
    console.log('Rsa:', response);
  });
}

main();
