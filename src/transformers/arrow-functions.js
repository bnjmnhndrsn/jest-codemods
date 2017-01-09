export default (fileInfo, api, options) => {
    const j = api.jscodeshift;
    const root = j(fileInfo.source);


    const getBodyStatement = fn => {
    // 79 characters fit on a line of length 80
        const maxWidth = options['max-width'] ? options['max-width'] - 1 : undefined;

        if (
      fn.body.type == 'BlockStatement' &&
      fn.body.body.length == 1
    ) {
            const inner = fn.body.body[0];
            const comments = (fn.body.comments || []).concat(inner.comments || []);

            if (
        options['inline-single-expressions'] &&
        inner.type == 'ExpressionStatement'
      ) {
                inner.expression.comments = (inner.expression.comments || []).concat(comments);
                return inner.expression;
            } else if (inner.type == 'ReturnStatement') {
                const lineStart = fn.loc.start.line;
                const originalLineLength = fn.loc.lines.getLineLength(lineStart);
                const approachDifference = 'function(a, b) {'.length - '(a, b) => );'.length;
                const argumentLength = inner.argument.end - inner.argument.start;

                const newLength = originalLineLength + argumentLength - approachDifference;
                const tooLong = maxWidth && newLength > maxWidth;

                if (!tooLong) {
                    inner.argument.comments = (inner.argument.comments || []).concat(comments);
                    return inner.argument;
                }
            }
        }
        return fn.body;
    };

    const createArrowFunctionExpression = fn => {
        const arrowFunction = j.arrowFunctionExpression(
            fn.params,
            getBodyStatement(fn),
            false
        );
        arrowFunction.comments = fn.comments;
        return arrowFunction;
    };


    const callExpressions = root.find(j.FunctionExpression)
    .filter(path => {
        const isArgument = path.parentPath.name === 'arguments' && path.parentPath.value.indexOf(path.value) > -1;
        if (!isArgument) {
            return false;
        }
        const calleeName = path.parentPath.parentPath.value.callee.name;
        const isTarget = ['before', 'beforeEach', 'after', 'afterEach', 'describe', 'it'].indexOf(calleeName) > -1;
        return isTarget;
    })
    .forEach(path => {
        j(path).replaceWith(
          createArrowFunctionExpression(path.value)
        );
    });

    return root.toSource();
};
