module.exports = {
    "extends": "standard",
    "env": {
        "node": true
    },
    "globals": {
    },
    "plugins": [
        "html"
    ],
    "rules": {
        "indent": [
            "error",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "space-before-function-paren": [
            "error",
            {
                "named": "never"
            }
        ],
        "prefer-promise-reject-errors": [
            "error",
            {
                "allowEmptyReject": true
            }
        ]
    }
}