module.exports = function (RED) {
  function ShowValueNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      let status;
      if(config.path !== "") {
          let tokens = config.path.split(".");
          status = msg.payload;
          for(let token of tokens) {
              status = status[token];
          }
      } else {
          status = msg.payload;
      }

      node.status({shape: "dot", fill: "grey", text: JSON.stringify(status)})  
      node.send(msg);
    });
  }
  RED.nodes.registerType("show-value", ShowValueNode);
};
