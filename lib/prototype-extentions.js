'use strict';

function check(node, type) {
  return node !== undefined && node.type === type;
}

const isPrototypeExtension = (property) => (
  check(property, 'Identifier') &&
  ['property', 'observe', 'observes', 'on'].includes(property.name)
);

module.exports = function(context) {
  return {
    CallExpression(node) {
      const { callee } = node;
      if (
        check(node, 'CallExpression') &&
        check(callee, 'MemberExpression') &&
        check(callee.object, 'FunctionExpression') &&
        isPrototypeExtension(callee.property)
      ) {
        context.report({
          node: callee.property,
          message: 'Don\'t use Ember\'s function prototype extensions',
        });
      }
    },
  };
};
