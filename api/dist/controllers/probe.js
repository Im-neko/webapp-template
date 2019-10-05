"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * GET・POST /probe
 * Helth Check.
 */
exports.probe = (req, res) => {
    console.log('--------------probe.ctrl');
    res.status(200).json({ message: "success", data: {}, error: false });
};
//# sourceMappingURL=probe.js.map