function e() {
    return e = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = arguments[t];
            for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
        }
        return e
    }, e.apply(this, arguments)
}
var t = 0;

function i(e) {
    return "__private_" + t++ + "_" + e
}

function n(e, t) {
    if (!Object.prototype.hasOwnProperty.call(e, t)) throw new TypeError("attempted to use private field on non-instance");
    return e
}
class r {
    constructor(e, t) {
        var i;
        this.formContainer = void 0, this.elementWrapper = void 0, this.element = void 0, this.active = void 0, this.id = void 0, this.parentView = void 0, this._model = void 0, this.state = void 0, this.options = void 0, this.formContainer = e.formContainer, this.id = e.id, this.element = document.createElement("div"), this.elementWrapper = e.element, this.active = !1, this._model = t, this.state = null == (i = this._model) ? void 0 : i.getState()
    }
    setParent(e) {
        this.parentView = e, this.parentView.addChild && this.parentView.addChild(this)
    }
    setActive() {
        this.isActive() || this.element.setAttribute("data-cmp-active", "true"), this.parentView && this.parentView.setActive && this.parentView.setActive()
    }
    setInactive() {
        this.isActive() && this.element.setAttribute("data-cmp-active", "false"), this.parentView && this.parentView.setInactive && this.parentView.setInactive()
    }
    isActive() {
        return this.active
    }
    getFormContainerPath() {
        var e;
        return null == (e = this.options) ? void 0 : e.adaptiveformcontainerPath
    }
    getId() {
        return this.id
    }
    toggle(e, t, i) {
        this.toggleAttribute(this.element, e, t, i)
    }
    toggleAttribute(e, t, i, n) {
        e && (!1 === t ? e.setAttribute(i, n) : e.removeAttribute(i))
    }
    getLayoutProperties() {
        let e = {};
        const t = this.state;
        return t && t.properties && t.properties["afs:layout"] && (e = t.properties["afs:layout"]), e
    }
    getModel() {
        return this._model
    }
    subscribe() {
        throw "the field does not subscribe to the model"
    }
    isVisible() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.visible) || !0
    }
    isEnabled() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.enabled) || !0
    }
    isLabelVisible() {
        var e, t;
        return (null == this || null == (e = this.state) || null == (t = e.label) ? void 0 : t.visible) || !0
    }
    getLabelValue() {
        var e, t;
        return (null == this || null == (e = this.state) || null == (t = e.label) ? void 0 : t.value) || ""
    }
    getName() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.name) || ""
    }
    isTooltipVisible() {
        return !!this.getTooltipValue()
    }
    getTooltipValue() {
        var e;
        return null == this || null == (e = this.state) ? void 0 : e.tooltip
    }
    getDescriptionValue() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.description) || ""
    }
    getDefault() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.default) || ""
    }
    isReadOnly() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.readOnly) || !1
    }
    isRequired() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.required) || !1
    }
    getPlaceHolder() {
        var e;
        return (null == this || null == (e = this.state) ? void 0 : e.placeholder) || ""
    }
    isArrayType() {
        return "array" == this.state.type
    }
}
r.IS = "FormField";
class s extends r {
    constructor(e, t) {
        super(e, t), this.qm = void 0, this.widget = void 0, this.label = void 0, this.errorDiv = void 0, this.tooltip = void 0, this.description = void 0, this.customWidget = void 0, this.elementWrapper.className = this.getbemBlock()
    }
    getWidget() {
        throw "method not implemented"
    }
    getDescription() {
        throw "method not implemented"
    }
    getLabel() {
        throw "method not implemented"
    }
    getErrorDiv() {
        throw "method not implemented"
    }
    getTooltipDiv() {
        throw "method not implemented"
    }
    getQuestionMarkDiv() {
        throw "method not implemented"
    }
    setFocus() {
        var e;
        null == (e = this.getWidget()) || e.focus()
    }
    _applyState(e) {
        e.value && this._updateValue(e.value), this._updateVisible(e.visible), this._updateEnabled(e.enabled), this._initializeHelpContent(e)
    }
    _initializeHelpContent(e) {
        this._showHideLongDescriptionDiv(!1), this.getDescription() && this._addHelpIconHandler(e)
    }
    _showHideTooltipDiv(e) {
        this.tooltip && this.toggleAttribute(this.getTooltipDiv(), e, "data-cmp-visible", !1)
    }
    _showHideLongDescriptionDiv(e) {
        this.description && this.toggleAttribute(this.description, e, "data-cmp-visible", !1)
    }
    _isTooltipAlwaysVisible() {
        return !!this.getLayoutProperties().tooltipVisible
    }
    _updateVisible(e) {
        this.toggle(e, "aria-hidden", !0), this.element.setAttribute("data-cmp-visible", e + "")
    }
    _updateEnabled(e) {
        var t, i, n, r;
        this.getWidget() ? (this.toggle(e, "aria-disabled", !0), this.element.setAttribute("data-cmp-enabled", e + ""), !1 === e ? (null == (t = this.getWidget()) || t.setAttribute("disabled", "true"), null == (i = this.getWidget()) || i.setAttribute("aria-disabled", "true")) : (null == (n = this.getWidget()) || n.removeAttribute("disabled"), null == (r = this.getWidget()) || r.removeAttribute("aria-disabled"))) : this.customWidget && this.customWidget(this.elementWrapper, this._model, this._model.getState())
    }
    _updateValid(e, t) {
        this.errorDiv && (this.toggle(e, "aria-invalid", !0), this.element.setAttribute("data-cmp-valid", e + ""), "string" != typeof t.errorMessage || "" === t.errorMessage) && (this.errorDiv.innerHTML = !0 === e ? "" : "Please fill in this field.")
    }
    _updateErrorMessage(e, t) {
        this.errorDiv && (this.errorDiv.innerHTML = t.errorMessage)
    }
    _updateValue(e) {
        let t = this.getWidget();
        t && (t.value = e)
    }
    _addHelpIconHandler(e) {
        const t = this.qm,
            i = this.description,
            n = this._isTooltipAlwaysVisible(),
            r = this;
        t && i && t.addEventListener("click", e => {
            e.preventDefault(), "false" === i.getAttribute("data-cmp-visible") ? (r._showHideLongDescriptionDiv(!0), n && r._showHideTooltipDiv(!1)) : (r._showHideLongDescriptionDiv(!1), n && r._showHideTooltipDiv(!0))
        })
    }
    getClass() {
        return this.constructor.IS
    }
    subscribe() {
        var e;
        null == (e = this._model) || e.subscribe(e => {
            let t = e.target.getState();
            e.payload.changes.forEach(e => {
                const i = `_update${(n = e.propertyName)[0].toUpperCase() + n.slice(1)}`;
                var n;
                "function" == typeof this[i] ? "items" === e.propertyName ? this[i](e.prevValue, e.currentValue, t) : this[i](e.currentValue, t) : console.error(`changes to ${e.propertyName} are not supported. Please raise an issue`)
            })
        })
    }
    setElements() {
        this.widget = this.getWidget(), this.description = this.getDescription(), this.label = this.getLabel(), this.errorDiv = this.getErrorDiv(), this.qm = this.getQuestionMarkDiv(), this.tooltip = this.getTooltipDiv()
    }
    getbemBlock() {
        throw "bemBlock not implemented"
    }
    getIS() {
        throw "IS is not implemented"
    }
    getId() {
        return this.getIS() + "-" + this.id
    }
    addListener() {}
    render() {
        this.elementWrapper.appendChild(this.createView()), this.setElements(), this.addListener(), this.subscribe()
    }
    createView() {
        var e, t;
        this.element.id = this.getId(), this.element.className = this.getbemBlock(), this.element.dataset.cmpVisible = null == (e = this.isVisible()) ? void 0 : e.toString(), this.element.dataset.cmpEnabled = null == (t = this.isEnabled()) ? void 0 : t.toString(), this.element.dataset.cmpIs = this.getIS(), this.element.dataset.cmpAdaptiveformcontainerPath = this.getFormContainerPath(), this.isLabelVisible() && this.element.appendChild(this.createLabel());
        let i = this.createInputHTML();
        return i && (i instanceof Element ? this.element.appendChild(i) : i instanceof Array && (null == i || i.forEach(e => {
            this.element.appendChild(e)
        }))), this.getDescriptionValue() && this.element.appendChild(this.createLongDescHTML()), this.isTooltipVisible() && (this.element.appendChild(this.createQuestionMarkHTML()), this.element.appendChild(this.createShortDescHTML())), this.element.appendChild(this.createErrorHTML()), this.element
    }
    createInputHTML() {
        throw "getInputHTML is not implemented"
    }
    createLabel() {
        let e = document.createElement("label");
        return e.id = this.getId() + "-label", e.htmlFor = this.getId(), e.className = this.getbemBlock() + "__label", e.textContent = this.getLabelValue(), e
    }
    createQuestionMarkHTML() {
        let e = document.createElement("button");
        return e.className = this.getbemBlock() + "__questionmark cmp-adaptiveform__questionmark", e
    }
    createShortDescHTML() {
        let e = document.createElement("div");
        return e.id = this.getId() + "-shortDescription", e.className = this.getbemBlock() + "__shortdescription cmp-adaptiveform__shortdescription", e
    }
    createLongDescHTML() {
        let e = document.createElement("div");
        e.setAttribute("aria-live", "polite"), e.id = this.getId() + "-longDescription", e.className = this.getbemBlock() + "__longdescription cmp-adaptiveform__longdescription";
        let t = document.createElement("p");
        return t.innerHTML = this.getDescriptionValue(), e.append(t), e
    }
    createErrorHTML() {
        let e = document.createElement("div");
        return e.id = this.getId() + "-errorMessage", e.className = this.getbemBlock() + "__errormessage", e
    }
    setDisabledAttribute(e) {
        e.disabled = !this.isEnabled()
    }
    setReadonlyAttribute(e) {
        e.disabled = this.isReadOnly()
    }
    setStringContraints(e) {
        var t, i, n, r;
        let s = (null == (t = this.state) ? void 0 : t.maxLength) || 0,
            l = (null == (i = this.state) ? void 0 : i.minLength) || 0;
        l > 0 && (e.minLength = l), s > 0 && (e.maxLength = s), e instanceof HTMLInputElement && null != (n = this.state) && n.pattern && (e.pattern = null == (r = this.state) ? void 0 : r.pattern)
    }
    setNumberConstraints(e) {
        var t, i;
        let n = (null == (t = this.state) ? void 0 : t.maximum) || 0,
            r = (null == (i = this.state) ? void 0 : i.minimum) || 0;
        n > 0 && (e.max = null == n ? void 0 : n.toString()), r > 0 && (e.min = null == r ? void 0 : r.toString())
    }
}
class l extends s {
    getWidget() {
        return this.element.querySelector(l.selectors.widget)
    }
    getDescription() {
        return this.element.querySelector(l.selectors.description)
    }
    getLabel() {
        return this.element.querySelector(l.selectors.label)
    }
    getErrorDiv() {
        return this.element.querySelector(l.selectors.errorDiv)
    }
    getTooltipDiv() {
        return this.element.querySelector(l.selectors.tooltipDiv)
    }
    getQuestionMarkDiv() {
        return this.element.querySelector(l.selectors.qm)
    }
    addListener() {
        var e, t;
        null == (e = this.getWidget()) || e.addEventListener("blur", e => {
            this._model.value = e.target.value, this.setInactive()
        }), null == (t = this.getWidget()) || t.addEventListener("focus", e => {
            this.setActive()
        })
    }
    getbemBlock() {
        return l.bemBlock
    }
    getIS() {
        return l.IS
    }
    createInputHTML() {
        let e = document.createElement("input");
        return e.type = "text", e.className = l.selectors.widget.replace(".", ""), e.title = this.isTooltipVisible() ? this.getTooltipValue() : "", e.name = this.getName(), e.value = this.state.value ? this.state.value : null, e.placeholder = this.getPlaceHolder(), e.required = this.isRequired(), e.setAttribute("aria-label", this.isLabelVisible() ? this.getLabelValue() : ""), this.setDisabledAttribute(e), this.setReadonlyAttribute(e), this.setStringContraints(e), e
    }
}
l.NS = "cmp", l.IS = "adaptiveFormTextInput", l.bemBlock = "cmp-adaptiveform-textinput", l.selectors = {
    self: "[data-" + l.NS + '-is="' + l.IS + '"]',
    widget: `.${l.bemBlock}__widget`,
    label: `.${l.bemBlock}__label`,
    description: `.${l.bemBlock}__longdescription`,
    qm: `.${l.bemBlock}__questionmark`,
    errorDiv: `.${l.bemBlock}__errormessage`,
    tooltipDiv: `.${l.bemBlock}__shortdescription`
};
class o extends l {
    createInputHTML() {
        let e = document.createElement("textarea");
        return e.className = l.selectors.widget.replace(".", ""), e.title = this.isTooltipVisible() ? this.getTooltipValue() : "", e.name = this.getName(), e.value = this.getDefault(), e.placeholder = this.getPlaceHolder(), e.required = this.isRequired(), e.setAttribute("aria-label", this.isLabelVisible() ? this.getLabelValue() : ""), this.setDisabledAttribute(e), this.setReadonlyAttribute(e), this.setStringContraints(e), e
    }
}
var a = /*#__PURE__*/ i("checkIfEqual");
class u extends s {
    constructor(e, t) {
        super(e, t), Object.defineProperty(this, a, {
            writable: !0,
            value: function(e, t, i) {
                if (i) {
                    let i = !1;
                    return e.forEach(e => {
                        String(e) === t && (i = !0)
                    }), i
                }
                return String(e) === t
            }
        }), this.qm = this.element.querySelector(u.selectors.qm)
    }
    getWidget() {
        return this.element.querySelector(u.selectors.widget)
    }
    getDescription() {
        return this.element.querySelector(u.selectors.description)
    }
    getLabel() {
        return this.element.querySelector(u.selectors.label)
    }
    getErrorDiv() {
        return this.element.querySelector(u.selectors.errorDiv)
    }
    getQuestionMarkDiv() {
        return this.element.querySelector(u.selectors.qm)
    }
    getTooltipDiv() {
        return this.element.querySelector(u.selectors.tooltipDiv)
    }
    _updateValue(e) {
        let t = this.isArrayType();
        this.widget && [this.widget].forEach(i => {
            n(this, a)[a](e, i.value, t) ? i.setAttribute("selected", "selected") : i.removeAttribute("selected")
        })
    }
    addListener() {
        var e;
        null == (e = this.getWidget()) || e.addEventListener("blur", e => {
            if (this.isArrayType()) {
                let e = [];
                [this.widget].forEach(t => {
                    t.selected && e.push(t.value)
                }), this._model.value = e
            } else this._model.value = e.target.value
        })
    }
    getbemBlock() {
        return u.bemBlock
    }
    getIS() {
        return u.IS
    }
    createInputHTML() {
        var e, t;
        let i = document.createElement("select");
        if (i.className = "cmp-adaptiveform-dropdown__widget", i.title = this.isTooltipVisible() ? this.getTooltipValue() : "", i.name = this.getName(), i.multiple = this.isArrayType(), i.required = this.isRequired(), i.setAttribute("aria-label", this.isLabelVisible() ? this.getLabelValue() : ""), this.setDisabledAttribute(i), this.setReadonlyAttribute(i), this.getPlaceHolder()) {
            let e = this.createOptions("", this.getPlaceHolder(), !0, !0);
            i.appendChild(e)
        }
        return null == (e = this.state) || null == (t = e.enum) || t.forEach((e, t) => {
            var n, r;
            i.appendChild(this.createOptions(e, null == (n = this.state) || null == (r = n.enumNames) ? void 0 : r[t], e == this.getDefault(), !1))
        }), i
    }
    createOptions(e, t, i, n = !1) {
        let r = document.createElement("option");
        return r.value = e, r.disabled = n, r.textContent = t || e, r.selected = i, r.className = "cmp-adaptiveform-dropdown__option", r
    }
}
u.NS = "cmp", u.IS = "adaptiveFormDropDown", u.bemBlock = "cmp-adaptiveform-dropdown", u.selectors = {
    self: "[data-" + u.NS + '-is="' + u.IS + '"]',
    widget: `.${u.bemBlock}__widget`,
    options: `.${u.bemBlock}__option`,
    label: `.${u.bemBlock}__label`,
    description: `.${u.bemBlock}__longdescription`,
    qm: `.${u.bemBlock}__questionmark`,
    errorDiv: `.${u.bemBlock}__errormessage`,
    tooltipDiv: `.${u.bemBlock}__shortdescription`
}, console.time("script json-formula");
var c = {
        TYPE_NUMBER: 0,
        TYPE_ANY: 1,
        TYPE_STRING: 2,
        TYPE_ARRAY: 3,
        TYPE_OBJECT: 4,
        TYPE_BOOLEAN: 5,
        TYPE_EXPREF: 6,
        TYPE_NULL: 7,
        TYPE_ARRAY_NUMBER: 8,
        TYPE_ARRAY_STRING: 9,
        TYPE_CLASS: 10,
        TYPE_ARRAY_ARRAY: 11
    },
    h = {
        TOK_EOF: "EOF",
        TOK_UNQUOTEDIDENTIFIER: "UnquotedIdentifier",
        TOK_QUOTEDIDENTIFIER: "QuotedIdentifier",
        TOK_RBRACKET: "Rbracket",
        TOK_RPAREN: "Rparen",
        TOK_COMMA: "Comma",
        TOK_COLON: "Colon",
        TOK_CONCATENATE: "Concatenate",
        TOK_RBRACE: "Rbrace",
        TOK_NUMBER: "Number",
        TOK_CURRENT: "Current",
        TOK_GLOBAL: "Global",
        TOK_FIELD: "Field",
        TOK_EXPREF: "Expref",
        TOK_PIPE: "Pipe",
        TOK_OR: "Or",
        TOK_AND: "And",
        TOK_ADD: "Add",
        TOK_SUBTRACT: "Subtract",
        TOK_MULTIPLY: "Multiply",
        TOK_POWER: "Power",
        TOK_UNION: "Union",
        TOK_DIVIDE: "Divide",
        TOK_EQ: "EQ",
        TOK_GT: "GT",
        TOK_LT: "LT",
        TOK_GTE: "GTE",
        TOK_LTE: "LTE",
        TOK_NE: "NE",
        TOK_FLATTEN: "Flatten",
        TOK_STAR: "Star",
        TOK_FILTER: "Filter",
        TOK_DOT: "Dot",
        TOK_NOT: "Not",
        TOK_LBRACE: "Lbrace",
        TOK_LBRACKET: "Lbracket",
        TOK_LPAREN: "Lparen",
        TOK_LITERAL: "Literal"
    };
const {
    TYPE_NUMBER: d,
    TYPE_ANY: p,
    TYPE_STRING: m,
    TYPE_ARRAY: _,
    TYPE_OBJECT: g,
    TYPE_BOOLEAN: f,
    TYPE_EXPREF: v,
    TYPE_NULL: y,
    TYPE_ARRAY_NUMBER: b,
    TYPE_ARRAY_STRING: E,
    TYPE_CLASS: T,
    TYPE_ARRAY_ARRAY: O
} = c, {
    TOK_EXPREF: w
} = h, N = {
    [d]: "number",
    [p]: "any",
    [m]: "string",
    [_]: "array",
    [g]: "object",
    [f]: "boolean",
    [v]: "expression",
    [y]: "null",
    [b]: "Array<number>",
    [E]: "Array<string>",
    [T]: "class",
    [O]: "Array<array>"
};

function M(e, t = !0) {
    if (null === e) return y;
    let i = e;
    if (t) {
        if ("function" != typeof e.valueOf) return g;
        i = e.valueOf.call(e)
    }
    switch (Object.prototype.toString.call(i)) {
        case "[object String]":
            return m;
        case "[object Number]":
            return d;
        case "[object Array]":
            return _;
        case "[object Boolean]":
            return f;
        case "[object Null]":
            return y;
        case "[object Object]":
            return i.jmespathType === w ? v : g;
        default:
            return g
    }
}

function x(e) {
    return [M(e), M(e, !1)]
}

function D(e, t, i, n, r, s) {
    const l = e[0];
    if (-1 !== t.findIndex(e => e === p || l === e)) return i;
    let o = !1;
    if ((l === g || 1 === t.length && t[0] === T) && (o = !0), l === _ && 1 === t.length && t[0] === g && (o = !0), t.includes(O)) {
        if (l === _ && (i.forEach(e => {
                e instanceof Array || (o = !0)
            }), !o)) return i;
        o = !0
    }
    if (o) throw new Error(`TypeError: ${n} expected argument to be type ${N[t[0]]} but received type ${N[l]} instead.`);
    let a = -1;
    if (l === _ && t.includes(E) && t.includes(b) && (a = i.length > 0 && "string" == typeof i[0] ? E : b), -1 === a && [E, b, _].includes(l) && (a = t.find(e => [E, b, _].includes(e))), -1 === a && ([a] = t), a === p) return i;
    if (a === E || a === b || a === _) {
        if (a === _) return l === b || l === E ? i : null === i ? [] : [i];
        const t = a === b ? d : m;
        if (l === _) {
            const e = i.slice();
            for (let i = 0; i < e.length; i += 1) {
                const l = x(e[i]);
                e[i] = D(l, [t], e[i], n, r, s)
            }
            return e
        }
        if ([d, m, y, f].includes(t)) return [D(e, [t], i, n, r, s)]
    } else {
        if (a === d) return [m, f, y].includes(l) ? r(i) : 0;
        if (a === m) return l === y || l === g ? "" : s(i);
        if (a === f) return !!i;
        if (a === g && e[1] === g) return i
    }
    throw new Error("unhandled argument")
}

function j(e) {
    return null !== e && "[object Array]" === Object.prototype.toString.call(e)
}

function k(e) {
    return null !== e && "[object Object]" === Object.prototype.toString.call(e)
}

function P(e) {
    return null == e ? e : j(e) ? e.map(e => P(e)) : "function" != typeof e.valueOf ? e : e.valueOf()
}

function R(e, t) {
    const i = P(e),
        n = P(t);
    if (i === n) return !0;
    if (Object.prototype.toString.call(i) !== Object.prototype.toString.call(n)) return !1;
    if (!0 === j(i)) {
        if (i.length !== n.length) return !1;
        for (let e = 0; e < i.length; e += 1)
            if (!1 === R(i[e], n[e])) return !1;
        return !0
    }
    if (!0 === k(i)) {
        const e = {};
        for (const t in i)
            if (hasOwnProperty.call(i, t)) {
                if (!1 === R(i[t], n[t])) return !1;
                e[t] = !0
            }
        for (const t in n)
            if (hasOwnProperty.call(n, t) && !0 !== e[t]) return !1;
        return !0
    }
    return !1
}
const {
    TOK_CURRENT: S,
    TOK_GLOBAL: A,
    TOK_EXPREF: I,
    TOK_PIPE: $,
    TOK_EQ: C,
    TOK_GT: L,
    TOK_LT: B,
    TOK_GTE: Y,
    TOK_LTE: F,
    TOK_NE: q,
    TOK_FLATTEN: V
} = h, {
    TYPE_STRING: K,
    TYPE_ARRAY_STRING: U,
    TYPE_ARRAY: G
} = c;

function H(e) {
    if (null === e) return !0;
    const t = P(e);
    if ("" === t || !1 === t || null === t) return !0;
    if (j(t) && 0 === t.length) return !0;
    if (k(t)) {
        for (const e in t)
            if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
        return !0
    }
    return !t
}
class W {
    constructor(e, t, i, n, r, s) {
        this.runtime = e, this.globals = t, this.toNumber = i, this.toString = n, this.debug = r, this.language = s
    }
    search(e, t) {
        return this.visit(e, t)
    }
    visit(e, t) {
        const i = e && {
            Field: (e, t) => {
                if (null !== t && (k(t) || j(t))) {
                    let i = t[e.name];
                    if ("function" == typeof i && (i = void 0), void 0 === i) {
                        try {
                            this.debug.push(`Failed to find: '${e.name}'`);
                            const i = Object.keys(t).map(e => `'${e}'`).toString();
                            i.length && this.debug.push(`Available fields: ${i}`)
                        } catch (e) {}
                        return null
                    }
                    return i
                }
                return null
            },
            Subexpression: (e, t) => {
                let i = this.visit(e.children[0], t);
                for (let t = 1; t < e.children.length; t += 1)
                    if (i = this.visit(e.children[1], i), null === i) return null;
                return i
            },
            IndexExpression: (e, t) => {
                const i = this.visit(e.children[0], t);
                return this.visit(e.children[1], i)
            },
            Index: (e, t) => {
                if (j(t)) {
                    let i = this.toNumber(this.visit(e.value, t));
                    i < 0 && (i = t.length + i);
                    const n = t[i];
                    return void 0 === n ? (this.debug.push(`Index ${i} out of range`), null) : n
                }
                if (k(t)) {
                    const i = this.toString(this.visit(e.value, t)),
                        n = t[i];
                    return void 0 === n ? (this.debug.push(`Key ${i} does not exist`), null) : n
                }
                return this.debug.push(`left side of index expression ${t} is not an array or object.`), null
            },
            Slice: (e, t) => {
                if (!j(t)) return null;
                const i = e.children.slice(0).map(e => null != e ? this.toNumber(this.visit(e, t)) : null),
                    n = this.computeSliceParams(t.length, i),
                    [r, s, l] = n,
                    o = [];
                if (l > 0)
                    for (let e = r; e < s; e += l) o.push(t[e]);
                else
                    for (let e = r; e > s; e += l) o.push(t[e]);
                return o
            },
            Projection: (e, t) => {
                const i = this.visit(e.children[0], t);
                if (!j(i)) return null;
                const n = [];
                return i.forEach(t => {
                    const i = this.visit(e.children[1], t);
                    null !== i && n.push(i)
                }), n
            },
            ValueProjection: (e, t) => {
                const i = this.visit(e.children[0], t);
                if (!k(P(i))) return null;
                const n = [];
                return Object.values(i).forEach(t => {
                    const i = this.visit(e.children[1], t);
                    null !== i && n.push(i)
                }), n
            },
            FilterProjection: (e, t) => {
                const i = this.visit(e.children[0], t);
                if (!j(i)) return null;
                const n = i.filter(t => !H(this.visit(e.children[2], t))),
                    r = [];
                return n.forEach(t => {
                    const i = this.visit(e.children[1], t);
                    null !== i && r.push(i)
                }), r
            },
            Comparator: (e, t) => {
                const i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                if (e.name === C) return R(i, n);
                if (e.name === q) return !R(i, n);
                if (e.name === L) return i > n;
                if (e.name === Y) return i >= n;
                if (e.name === B) return i < n;
                if (e.name === F) return i <= n;
                throw new Error(`Unknown comparator: ${e.name}`)
            },
            [V]: (e, t) => {
                const i = this.visit(e.children[0], t);
                if (!j(i)) return null;
                const n = [];
                return i.forEach(e => {
                    j(e) ? n.push(...e) : n.push(e)
                }), n
            },
            Identity: (e, t) => t,
            MultiSelectList: (e, t) => null === t ? null : e.children.map(e => this.visit(e, t)),
            MultiSelectHash: (e, t) => {
                if (null === t) return null;
                const i = {};
                return e.children.forEach(e => {
                    i[e.name] = this.visit(e.value, t)
                }), i
            },
            OrExpression: (e, t) => {
                let i = this.visit(e.children[0], t);
                return H(i) && (i = this.visit(e.children[1], t)), i
            },
            AndExpression: (e, t) => {
                const i = this.visit(e.children[0], t);
                return !0 === H(i) ? i : this.visit(e.children[1], t)
            },
            AddExpression: (e, t) => {
                const i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                return this.applyOperator(i, n, "+")
            },
            ConcatenateExpression: (e, t) => {
                let i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                return i = D(x(i), [K, U], i, "concatenate", this.toNumber, this.toString), n = D(x(n), [K, U], n, "concatenate", this.toNumber, this.toString), this.applyOperator(i, n, "&")
            },
            UnionExpression: (e, t) => {
                let i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                return i = D(x(i), [G], i, "union", this.toNumber, this.toString), n = D(x(n), [G], n, "union", this.toNumber, this.toString), i.concat(n)
            },
            SubtractExpression: (e, t) => {
                const i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                return this.applyOperator(i, n, "-")
            },
            MultiplyExpression: (e, t) => {
                const i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                return this.applyOperator(i, n, "*")
            },
            DivideExpression: (e, t) => {
                const i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                return this.applyOperator(i, n, "/")
            },
            PowerExpression: (e, t) => {
                const i = this.visit(e.children[0], t),
                    n = this.visit(e.children[1], t);
                return this.applyOperator(i, n, "^")
            },
            NotExpression: (e, t) => H(this.visit(e.children[0], t)),
            Literal: e => e.value,
            Number: e => e.value,
            [$]: (e, t) => {
                const i = this.visit(e.children[0], t);
                return this.visit(e.children[1], i)
            },
            [S]: (e, t) => t,
            [A]: e => {
                const t = this.globals[e.name];
                return void 0 === t ? null : t
            },
            Function: (e, t) => {
                if ("if" === e.name) return this.runtime.callFunction(e.name, e.children, t, this, !1);
                const i = e.children.map(e => this.visit(e, t));
                return this.runtime.callFunction(e.name, i, t, this)
            },
            ExpressionReference: e => {
                const [t] = e.children;
                return t.jmespathType = I, t
            }
        }[e.type];
        if (!i) throw new Error(`Unknown/missing node type ${e && e.type || ""}`);
        return i(e, t)
    }
    computeSliceParams(e, t) {
        function i(e, t, i) {
            let n = t;
            return n < 0 ? (n += e, n < 0 && (n = i < 0 ? -1 : 0)) : n >= e && (n = i < 0 ? e - 1 : e), n
        }
        let [n, r, s] = t;
        if (null === s) s = 1;
        else if (0 === s) {
            const e = new Error("Invalid slice, step cannot be 0");
            throw e.name = "RuntimeError", e
        }
        const l = s < 0;
        return n = null === n ? l ? e - 1 : 0 : i(e, n, s), r = null === r ? l ? -1 : e : i(e, r, s), [n, r, s]
    }
    applyOperator(e, t, i) {
        if (j(e) && j(t)) {
            const n = e.length < t.length ? e : t,
                r = Math.abs(e.length - t.length);
            n.length += r, n.fill(null, n.length - r);
            const s = [];
            for (let n = 0; n < e.length; n += 1) s.push(this.applyOperator(e[n], t[n], i));
            return s
        }
        if (j(e)) return e.map(e => this.applyOperator(e, t, i));
        if (j(t)) return t.map(t => this.applyOperator(e, t, i));
        if ("*" === i) return this.toNumber(e) * this.toNumber(t);
        if ("&" === i) return e + t;
        if ("+" === i) return this.toNumber(e) + this.toNumber(t);
        if ("-" === i) return this.toNumber(e) - this.toNumber(t);
        if ("/" === i) {
            const i = e / t;
            return Number.isFinite(i) ? i : null
        }
        if ("^" === i) return e ** t;
        throw new Error(`Unknown operator: ${i}`)
    }
}
const {
    TOK_UNQUOTEDIDENTIFIER: z,
    TOK_QUOTEDIDENTIFIER: Q,
    TOK_RBRACKET: J,
    TOK_RPAREN: X,
    TOK_COMMA: Z,
    TOK_COLON: ee,
    TOK_CONCATENATE: te,
    TOK_RBRACE: ie,
    TOK_NUMBER: ne,
    TOK_CURRENT: re,
    TOK_GLOBAL: se,
    TOK_EXPREF: le,
    TOK_PIPE: oe,
    TOK_OR: ae,
    TOK_AND: ue,
    TOK_ADD: ce,
    TOK_SUBTRACT: he,
    TOK_MULTIPLY: de,
    TOK_POWER: pe,
    TOK_DIVIDE: me,
    TOK_UNION: _e,
    TOK_EQ: ge,
    TOK_GT: fe,
    TOK_LT: ve,
    TOK_GTE: ye,
    TOK_LTE: be,
    TOK_NE: Ee,
    TOK_FLATTEN: Te,
    TOK_STAR: Oe,
    TOK_FILTER: we,
    TOK_DOT: Ne,
    TOK_NOT: Me,
    TOK_LBRACE: xe,
    TOK_LBRACKET: De,
    TOK_LPAREN: je,
    TOK_LITERAL: ke
} = h, Pe = {
    ".": Ne,
    ",": Z,
    ":": ee,
    "{": xe,
    "}": ie,
    "]": J,
    "(": je,
    ")": X,
    "@": re
}, Re = {
    "<": !0,
    ">": !0,
    "=": !0,
    "!": !0
}, Se = {
    " ": !0,
    "\t": !0,
    "\n": !0
};

function Ae(e, t) {
    return e >= "0" && e <= "9" || t && "-" === e || "." === e
}

function Ie(e) {
    return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || "_" === e
}

function $e(e, t) {
    const i = e[t];
    return "$" === i ? e.length > t && Ie(e[t + 1]) : i >= "a" && i <= "z" || i >= "A" && i <= "Z" || "_" === i
}
class Ce {
    constructor(e = [], t = []) {
        this._allowedGlobalNames = e, this.debug = t
    }
    tokenize(e) {
        const t = [];
        let i, n, r;
        for (this._current = 0; this._current < e.length;) {
            const s = t.length ? t.slice(-1)[0].type : null;
            if (this._isGlobal(s, e, this._current)) t.push(this._consumeGlobal(e));
            else if ($e(e, this._current)) i = this._current, n = this._consumeUnquotedIdentifier(e), t.push({
                type: z,
                value: n,
                start: i
            });
            else if (void 0 !== Pe[e[this._current]]) t.push({
                type: Pe[e[this._current]],
                value: e[this._current],
                start: this._current
            }), this._current += 1;
            else if ("-" === e[this._current] && ![re, ne, X, z, Q, J].includes(s) || Ae(e[this._current], !1)) r = this._consumeNumber(e), t.push(r);
            else if ("[" === e[this._current]) r = this._consumeLBracket(e), t.push(r);
            else if ('"' === e[this._current]) i = this._current, n = this._consumeQuotedIdentifier(e), t.push({
                type: Q,
                value: n,
                start: i
            });
            else if ("'" === e[this._current]) i = this._current, n = this._consumeRawStringLiteral(e), t.push({
                type: ke,
                value: n,
                start: i
            });
            else if ("`" === e[this._current]) {
                i = this._current;
                const n = this._consumeLiteral(e);
                t.push({
                    type: ke,
                    value: n,
                    start: i
                })
            } else if (void 0 !== Re[e[this._current]]) t.push(this._consumeOperator(e));
            else if (void 0 !== Se[e[this._current]]) this._current += 1;
            else if ("&" === e[this._current]) i = this._current, this._current += 1, "&" === e[this._current] ? (this._current += 1, t.push({
                type: ue,
                value: "&&",
                start: i
            })) : t.push(s === Z || s === je ? {
                type: le,
                value: "&",
                start: i
            } : {
                type: te,
                value: "&",
                start: i
            });
            else if ("~" === e[this._current]) i = this._current, this._current += 1, t.push({
                type: _e,
                value: "~",
                start: i
            });
            else if ("+" === e[this._current]) i = this._current, this._current += 1, t.push({
                type: ce,
                value: "+",
                start: i
            });
            else if ("-" === e[this._current]) i = this._current, this._current += 1, t.push({
                type: he,
                value: "-",
                start: i
            });
            else if ("*" === e[this._current]) {
                i = this._current, this._current += 1;
                const e = t.length && t.slice(-1)[0].type;
                0 === t.length || [De, Ne, oe, ue, ae, Z, ee].includes(e) ? t.push({
                    type: Oe,
                    value: "*",
                    start: i
                }) : t.push({
                    type: de,
                    value: "*",
                    start: i
                })
            } else if ("/" === e[this._current]) i = this._current, this._current += 1, t.push({
                type: me,
                value: "/",
                start: i
            });
            else if ("^" === e[this._current]) i = this._current, this._current += 1, t.push({
                type: pe,
                value: "^",
                start: i
            });
            else {
                if ("|" !== e[this._current]) {
                    const t = new Error(`Unknown character:${e[this._current]}`);
                    throw t.name = "LexerError", t
                }
                i = this._current, this._current += 1, "|" === e[this._current] ? (this._current += 1, t.push({
                    type: ae,
                    value: "||",
                    start: i
                })) : t.push({
                    type: oe,
                    value: "|",
                    start: i
                })
            }
        }
        return t
    }
    _consumeUnquotedIdentifier(e) {
        const t = this._current;
        for (this._current += 1; this._current < e.length && Ie(e[this._current]);) this._current += 1;
        return e.slice(t, this._current)
    }
    _consumeQuotedIdentifier(e) {
        const t = this._current;
        this._current += 1;
        const i = e.length;
        let n = !$e(e, t + 1);
        for (;
            '"' !== e[this._current] && this._current < i;) {
            let t = this._current;
            Ie(e[t]) || (n = !0), t += "\\" !== e[t] || "\\" !== e[t + 1] && '"' !== e[t + 1] ? 1 : 2, this._current = t
        }
        this._current += 1;
        const r = e.slice(t, this._current);
        try {
            n && !r.includes(" ") || (this.debug.push(`Suspicious quotes: ${r}`), this.debug.push(`Did you intend a literal? '${r.replace(/"/g, "")}'?`))
        } catch (e) {}
        return JSON.parse(r)
    }
    _consumeRawStringLiteral(e) {
        const t = this._current;
        this._current += 1;
        const i = e.length;
        for (;
            "'" !== e[this._current] && this._current < i;) {
            let t = this._current;
            t += "\\" !== e[t] || "\\" !== e[t + 1] && "'" !== e[t + 1] ? 1 : 2, this._current = t
        }
        return this._current += 1, e.slice(t + 1, this._current - 1).replaceAll("\\'", "'")
    }
    _consumeNumber(e) {
        const t = this._current;
        this._current += 1;
        const i = e.length;
        for (; Ae(e[this._current], !1) && this._current < i;) this._current += 1;
        const n = e.slice(t, this._current);
        let r;
        return r = n.includes(".") ? parseFloat(n) : parseInt(n, 10), {
            type: ne,
            value: r,
            start: t
        }
    }
    _consumeLBracket(e) {
        const t = this._current;
        return this._current += 1, "?" === e[this._current] ? (this._current += 1, {
            type: we,
            value: "[?",
            start: t
        }) : "]" === e[this._current] ? (this._current += 1, {
            type: Te,
            value: "[]",
            start: t
        }) : {
            type: De,
            value: "[",
            start: t
        }
    }
    _isGlobal(e, t, i) {
        if (null !== e && e === Ne) return !1;
        if ("$" !== t[i]) return !1;
        let n = i + 1;
        for (; n < t.length && Ie(t[n]);) n += 1;
        const r = t.slice(i, n);
        return this._allowedGlobalNames.includes(r)
    }
    _consumeGlobal(e) {
        const t = this._current;
        for (this._current += 1; this._current < e.length && Ie(e[this._current]);) this._current += 1;
        const i = e.slice(t, this._current);
        return {
            type: se,
            name: i,
            start: t
        }
    }
    _consumeOperator(e) {
        const t = this._current,
            i = e[t];
        return this._current += 1, "!" === i ? "=" === e[this._current] ? (this._current += 1, {
            type: Ee,
            value: "!=",
            start: t
        }) : {
            type: Me,
            value: "!",
            start: t
        } : "<" === i ? "=" === e[this._current] ? (this._current += 1, {
            type: be,
            value: "<=",
            start: t
        }) : {
            type: ve,
            value: "<",
            start: t
        } : ">" === i ? "=" === e[this._current] ? (this._current += 1, {
            type: ye,
            value: ">=",
            start: t
        }) : {
            type: fe,
            value: ">",
            start: t
        } : "=" === e[this._current] ? (this._current += 1, {
            type: ge,
            value: "==",
            start: t
        }) : {
            type: ge,
            value: "=",
            start: t
        }
    }
    _consumeLiteral(e) {
        this._current += 1;
        const t = this._current,
            i = e.length;
        let n, r = !1;
        for (;
            (r || "`" !== e[this._current]) && this._current < i;) {
            let t = this._current;
            r && "\\" === e[t] && '"' === e[t + 1] ? t += 2 : ('"' === e[t] && (r = !r), t += r && "`" === e[t + 1] ? 2 : "\\" !== e[t] || "\\" !== e[t + 1] && "`" !== e[t + 1] ? 1 : 2), this._current = t
        }
        let s = e.slice(t, this._current).trimStart();
        return s = s.replaceAll("\\`", "`"), n = function(e) {
            if ("" === e) return !1;
            if ('[{"'.includes(e[0])) return !0;
            if (["true", "false", "null"].includes(e)) return !0;
            if (!"-0123456789".includes(e[0])) return !1;
            try {
                return JSON.parse(e), !0
            } catch (e) {
                return !1
            }
        }(s) ? JSON.parse(s) : JSON.parse(`"${s}"`), this._current += 1, n
    }
}
const {
    TOK_LITERAL: Le,
    TOK_COLON: Be,
    TOK_EOF: Ye,
    TOK_UNQUOTEDIDENTIFIER: Fe,
    TOK_QUOTEDIDENTIFIER: qe,
    TOK_RBRACKET: Ve,
    TOK_RPAREN: Ke,
    TOK_COMMA: Ue,
    TOK_CONCATENATE: Ge,
    TOK_RBRACE: He,
    TOK_NUMBER: We,
    TOK_CURRENT: ze,
    TOK_GLOBAL: Qe,
    TOK_FIELD: Je,
    TOK_EXPREF: Xe,
    TOK_PIPE: Ze,
    TOK_OR: et,
    TOK_AND: tt,
    TOK_ADD: it,
    TOK_SUBTRACT: nt,
    TOK_MULTIPLY: rt,
    TOK_POWER: st,
    TOK_DIVIDE: lt,
    TOK_UNION: ot,
    TOK_EQ: at,
    TOK_GT: ut,
    TOK_LT: ct,
    TOK_GTE: ht,
    TOK_LTE: dt,
    TOK_NE: pt,
    TOK_FLATTEN: mt,
    TOK_STAR: _t,
    TOK_FILTER: gt,
    TOK_DOT: ft,
    TOK_NOT: vt,
    TOK_LBRACE: yt,
    TOK_LBRACKET: bt,
    TOK_LPAREN: Et
} = h, Tt = {
    [Ye]: 0,
    [Fe]: 0,
    [qe]: 0,
    [Ve]: 0,
    [Ke]: 0,
    [Ue]: 0,
    [He]: 0,
    [We]: 0,
    [ze]: 0,
    [Qe]: 0,
    [Je]: 0,
    [Xe]: 0,
    [Ze]: 1,
    [et]: 2,
    [tt]: 3,
    [it]: 6,
    [nt]: 6,
    [Ge]: 7,
    [rt]: 7,
    [lt]: 7,
    [st]: 7,
    [ot]: 7,
    [at]: 5,
    [ut]: 5,
    [ct]: 5,
    [ht]: 5,
    [dt]: 5,
    [pt]: 5,
    [mt]: 9,
    [_t]: 20,
    [gt]: 21,
    [ft]: 40,
    [vt]: 45,
    [yt]: 50,
    [bt]: 55,
    [Et]: 60
};
class Ot {
    constructor(e = []) {
        this._allowedGlobalNames = e
    }
    parse(e, t) {
        this._loadTokens(e, t), this.index = 0;
        const i = this.expression(0);
        if (this._lookahead(0) !== Ye) {
            const e = this._lookaheadToken(0),
                t = new Error(`Unexpected token type: ${e.type}, value: ${e.value}`);
            throw t.name = "ParserError", t
        }
        return i
    }
    _loadTokens(e, t) {
        const i = new Ce(this._allowedGlobalNames, t).tokenize(e);
        i.push({
            type: Ye,
            value: "",
            start: e.length
        }), this.tokens = i
    }
    expression(e) {
        const t = this._lookaheadToken(0);
        this._advance();
        let i = this.nud(t),
            n = this._lookahead(0);
        for (; e < Tt[n];) this._advance(), i = this.led(n, i), n = this._lookahead(0);
        return i
    }
    _lookahead(e) {
        return this.tokens[this.index + e].type
    }
    _lookaheadToken(e) {
        return this.tokens[this.index + e]
    }
    _advance() {
        this.index += 1
    }
    _getIndex() {
        return this.index
    }
    _setIndex(e) {
        this.index = e
    }
    nud(e) {
        let t, i, n, r, s;
        switch (e.type) {
            case Le:
                return {
                    type: "Literal",
                    value: e.value
                };
            case We:
                return {
                    type: "Number",
                    value: e.value
                };
            case Fe:
                return {
                    type: "Field",
                    name: e.value
                };
            case qe:
                if (r = {
                        type: "Field",
                        name: e.value
                    }, this._lookahead(0) === Et) throw new Error("Quoted identifier not allowed for function names.");
                return r;
            case vt:
                return i = this.expression(Tt.Not), {
                    type: "NotExpression",
                    children: [i]
                };
            case _t:
                return t = {
                    type: "Identity"
                }, i = this._lookahead(0) === Ve ? {
                    type: "Identity"
                } : this._parseProjectionRHS(Tt.Star), {
                    type: "ValueProjection",
                    children: [t, i]
                };
            case gt:
                return this.led(e.type, {
                    type: "Identity"
                });
            case yt:
                return this._parseMultiselectHash();
            case mt:
                return t = {
                    type: mt,
                    children: [{
                        type: "Identity"
                    }]
                }, i = this._parseProjectionRHS(Tt.Flatten), {
                    type: "Projection",
                    children: [t, i]
                };
            case bt:
                return this._lookahead(0) === _t && this._lookahead(1) === Ve ? (this._advance(), this._advance(), i = this._parseProjectionRHS(Tt.Star), {
                    type: "Projection",
                    children: [{
                        type: "Identity"
                    }, i]
                }) : this._parseUnchainedIndexExpression();
            case ze:
                return {
                    type: ze
                };
            case Qe:
                return {
                    type: Qe,
                    name: e.name
                };
            case Je:
                return {
                    type: Je
                };
            case Xe:
                return n = this.expression(Tt.Expref), {
                    type: "ExpressionReference",
                    children: [n]
                };
            case Et:
                for (s = []; this._lookahead(0) !== Ke;) n = this.expression(0), s.push(n);
                return this._match(Ke), s[0];
            default:
                this._errorToken(e)
        }
    }
    led(e, t) {
        let i, n, r, s, l, o, a, u, c;
        switch (e) {
            case Ge:
                return n = this.expression(Tt.Concatenate), {
                    type: "ConcatenateExpression",
                    children: [t, n]
                };
            case ft:
                return a = Tt.Dot, this._lookahead(0) !== _t ? (n = this._parseDotRHS(a), {
                    type: "Subexpression",
                    children: [t, n]
                }) : (this._advance(), n = this._parseProjectionRHS(a), {
                    type: "ValueProjection",
                    children: [t, n]
                });
            case Ze:
                return n = this.expression(Tt.Pipe), {
                    type: Ze,
                    children: [t, n]
                };
            case et:
                return n = this.expression(Tt.Or), {
                    type: "OrExpression",
                    children: [t, n]
                };
            case tt:
                return n = this.expression(Tt.And), {
                    type: "AndExpression",
                    children: [t, n]
                };
            case it:
                return n = this.expression(Tt.Add), {
                    type: "AddExpression",
                    children: [t, n]
                };
            case nt:
                return n = this.expression(Tt.Subtract), {
                    type: "SubtractExpression",
                    children: [t, n]
                };
            case rt:
                return n = this.expression(Tt.Multiply), {
                    type: "MultiplyExpression",
                    children: [t, n]
                };
            case lt:
                return n = this.expression(Tt.Divide), {
                    type: "DivideExpression",
                    children: [t, n]
                };
            case st:
                return n = this.expression(Tt.Power), {
                    type: "PowerExpression",
                    children: [t, n]
                };
            case ot:
                return n = this.expression(Tt.Power), {
                    type: "UnionExpression",
                    children: [t, n]
                };
            case Et:
                for (r = t.name, s = []; this._lookahead(0) !== Ke;) l = this.expression(0), this._lookahead(0) === Ue && this._match(Ue), s.push(l);
                return this._match(Ke), o = {
                    type: "Function",
                    name: r,
                    children: s
                }, o;
            case gt:
                return i = this.expression(0), this._match(Ve), n = this._lookahead(0) === mt ? {
                    type: "Identity"
                } : this._parseProjectionRHS(Tt.Filter), {
                    type: "FilterProjection",
                    children: [t, n, i]
                };
            case mt:
                return u = {
                    type: mt,
                    children: [t]
                }, c = this._parseProjectionRHS(Tt.Flatten), {
                    type: "Projection",
                    children: [u, c]
                };
            case at:
            case pt:
            case ut:
            case ht:
            case ct:
            case dt:
                return this._parseComparator(t, e);
            case bt:
                return this._lookahead(0) === _t && this._lookahead(1) === Ve ? (this._advance(), this._advance(), n = this._parseProjectionRHS(Tt.Star), {
                    type: "Projection",
                    children: [t, n]
                }) : (n = this._parseChainedIndexExpression(), this._projectIfSlice(t, n));
            default:
                this._errorToken(this._lookaheadToken(0))
        }
    }
    _match(e) {
        if (this._lookahead(0) !== e) {
            const t = this._lookaheadToken(0),
                i = new Error(`Expected ${e}, got: ${t.type}`);
            throw i.name = "ParserError", i
        }
        this._advance()
    }
    _errorToken(e) {
        const t = new Error(`Invalid token (${e.type}): "${e.value}"`);
        throw t.name = "ParserError", t
    }
    _parseChainedIndexExpression() {
        const e = this._getIndex();
        if (this._lookahead(0) === Be) return this._parseSliceExpression();
        const t = this.expression(0);
        return this._lookahead(0) === Be ? (this._setIndex(e), this._parseSliceExpression()) : (this._match(Ve), {
            type: "Index",
            value: t
        })
    }
    _parseUnchainedIndexExpression() {
        const e = this._getIndex(),
            t = this._lookahead(0);
        if (t === Be) {
            const e = this._parseSliceExpression();
            return this._projectIfSlice({
                type: "Identity"
            }, e)
        }
        const i = this.expression(0),
            n = this._lookahead(0);
        if (n === Ue) return this._setIndex(e), this._parseMultiselectList();
        if (n === Be) {
            this._setIndex(e);
            const t = this._parseSliceExpression();
            return this._projectIfSlice({
                type: "Identity"
            }, t)
        }
        return t === We ? (this._match(Ve), {
            type: "Index",
            value: i
        }) : (this._setIndex(e), this._parseMultiselectList())
    }
    _projectIfSlice(e, t) {
        const i = {
            type: "IndexExpression",
            children: [e, t]
        };
        return "Slice" === t.type ? {
            type: "Projection",
            children: [i, this._parseProjectionRHS(Tt.Star)]
        } : i
    }
    _parseSliceExpression() {
        const e = [null, null, null];
        let t = 0,
            i = this._lookahead(0);
        for (; i !== Ve && t < 3;) {
            if (i === Be && t < 2) t += 1, this._advance();
            else {
                e[t] = this.expression(0);
                const i = this._lookahead(0);
                if (i !== Be && i !== Ve) {
                    const e = new Error(`Syntax error, unexpected token: ${i.value}(${i.type})`);
                    throw e.name = "Parsererror", e
                }
            }
            i = this._lookahead(0)
        }
        return this._match(Ve), {
            type: "Slice",
            children: e
        }
    }
    _parseComparator(e, t) {
        return {
            type: "Comparator",
            name: t,
            children: [e, this.expression(Tt[t])]
        }
    }
    _parseDotRHS(e) {
        const t = this._lookahead(0);
        return [Fe, qe, _t].indexOf(t) >= 0 ? this.expression(e) : t === bt ? (this._match(bt), this._parseMultiselectList()) : t === yt ? (this._match(yt), this._parseMultiselectHash()) : void 0
    }
    _parseProjectionRHS(e) {
        let t;
        if (Tt[this._lookahead(0)] < 10) t = {
            type: "Identity"
        };
        else if (this._lookahead(0) === bt) t = this.expression(e);
        else if (this._lookahead(0) === gt) t = this.expression(e);
        else {
            if (this._lookahead(0) !== ft) {
                const e = this._lookaheadToken(0),
                    t = new Error(`Sytanx error, unexpected token: ${e.value}(${e.type})`);
                throw t.name = "ParserError", t
            }
            this._match(ft), t = this._parseDotRHS(e)
        }
        return t
    }
    _parseMultiselectList() {
        const e = [];
        for (; this._lookahead(0) !== Ve;) {
            const t = this.expression(0);
            if (e.push(t), this._lookahead(0) === Ue && (this._match(Ue), this._lookahead(0) === Ve)) throw new Error("Unexpected token Rbracket")
        }
        return this._match(Ve), {
            type: "MultiSelectList",
            children: e
        }
    }
    _parseMultiselectHash() {
        const e = [],
            t = [Fe, qe];
        let i, n, r, s;
        if (this._lookahead(0) === He) return this._advance(), {
            type: "MultiSelectHash",
            children: []
        };
        for (;;) {
            if (i = this._lookaheadToken(0), t.indexOf(i.type) < 0) throw new Error(`Expecting an identifier token, got: ${i.type}`);
            if (n = i.value, this._advance(), this._match(Be), r = this.expression(0), s = {
                    type: "KeyValuePair",
                    name: n,
                    value: r
                }, e.push(s), this._lookahead(0) === Ue) this._match(Ue);
            else if (this._lookahead(0) === He) {
                this._match(He);
                break
            }
        }
        return {
            type: "MultiSelectHash",
            children: e
        }
    }
}

function wt(e, t) {
    const i = 10 ** t;
    return Math.round(e * i) / i
}

function Nt(e, t, i, n = []) {
    return {
        casefold: {
            _func: (e, i, n) => t(e[0]).toLocaleUpperCase(n.language).toLocaleLowerCase(n.language),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        and: {
            _func: t => {
                let i = !!e(t[0]);
                return t.slice(1).forEach(t => {
                    i = i && !!e(t)
                }), i
            },
            _signature: [{
                types: [c.TYPE_ANY],
                variadic: !0
            }]
        },
        deepScan: {
            _func: e => {
                const [t, i] = e, n = i.toString(), r = [];
                return null === t || function e(t) {
                    Object.entries(t).forEach(([t, i]) => {
                        t === n && r.push(i), "object" == typeof i && e(i)
                    })
                }(t), r
            },
            _signature: [{
                types: [c.TYPE_OBJECT, c.TYPE_ARRAY, c.TYPE_NULL]
            }, {
                types: [c.TYPE_STRING, c.TYPE_NUMBER]
            }]
        },
        or: {
            _func: t => {
                let i = !!e(t[0]);
                return t.slice(1).forEach(t => {
                    i = i || !!e(t)
                }), i
            },
            _signature: [{
                types: [c.TYPE_ANY],
                variadic: !0
            }]
        },
        not: {
            _func: t => !e(t[0]),
            _signature: [{
                types: [c.TYPE_ANY]
            }]
        },
        null: {
            _func: () => null,
            _signature: []
        },
        true: {
            _func: () => !0,
            _signature: []
        },
        false: {
            _func: () => !1,
            _signature: []
        },
        if: {
            _func: (t, i, n) => {
                const r = t[1],
                    s = t[2],
                    l = n.visit(t[0], i);
                return e(l) ? n.visit(r, i) : n.visit(s, i)
            },
            _signature: [{
                types: [c.TYPE_ANY]
            }, {
                types: [c.TYPE_ANY]
            }, {
                types: [c.TYPE_ANY]
            }]
        },
        substitute: {
            _func: e => {
                const n = t(e[0]),
                    r = t(e[1]),
                    s = t(e[2]);
                if (e.length <= 3) return n.replaceAll(r, s);
                const l = i(e[3]);
                if (l < 1) return n;
                let o = -1;
                for (let e = 0; e < l; e += 1) {
                    o += 1;
                    const e = n.slice(o).indexOf(r);
                    if (-1 === e) return n;
                    o += e
                }
                return n.slice(0, o) + n.slice(o).replace(r, s)
            },
            _signature: [{
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }]
        },
        value: {
            _func: e => {
                const t = e[0] || {},
                    i = e[1],
                    r = t[i];
                if (void 0 === r) {
                    n.push(`Failed to find: '${i}'`);
                    const e = Object.keys(t).map(e => `'${e}'`).toString();
                    return e.length && n.push(`Available fields: ${e}`), null
                }
                return r
            },
            _signature: [{
                types: [c.TYPE_OBJECT, c.TYPE_ARRAY, c.TYPE_NULL]
            }, {
                types: [c.TYPE_STRING, c.TYPE_NUMBER]
            }]
        },
        lower: {
            _func: e => t(e[0]).toLowerCase(),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        upper: {
            _func: e => t(e[0]).toUpperCase(),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        exp: {
            _func: e => {
                const t = i(e[0]);
                return Math.exp(t)
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        power: {
            _func: e => i(e[0]) ** i(e[1]),
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }]
        },
        find: {
            _func: e => {
                const n = t(e[0]),
                    r = t(e[1]),
                    s = e.length > 2 ? i(e[2]) : 0,
                    l = r.indexOf(n, s);
                return -1 === l ? null : l
            },
            _signature: [{
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }]
        },
        left: {
            _func: e => {
                const n = e.length > 1 ? i(e[1]) : 1;
                return n < 0 ? null : e[0] instanceof Array ? e[0].slice(0, n) : t(e[0]).substr(0, n)
            },
            _signature: [{
                types: [c.TYPE_STRING, c.TYPE_ARRAY]
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }]
        },
        right: {
            _func: e => {
                const n = e.length > 1 ? i(e[1]) : 1;
                if (n < 0) return null;
                if (e[0] instanceof Array) return 0 === n ? [] : e[0].slice(-1 * n);
                const r = t(e[0]);
                return r.substr(r.length - n, n)
            },
            _signature: [{
                types: [c.TYPE_STRING, c.TYPE_ARRAY]
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }]
        },
        mid: {
            _func: e => {
                const n = i(e[1]),
                    r = i(e[2]);
                return n < 0 ? null : e[0] instanceof Array ? e[0].slice(n, n + r) : t(e[0]).substr(n, r)
            },
            _signature: [{
                types: [c.TYPE_STRING, c.TYPE_ARRAY]
            }, {
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }]
        },
        mod: {
            _func: e => i(e[0]) % i(e[1]),
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }]
        },
        proper: {
            _func: e => t(e[0]).split(" ").map(e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(" "),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        rept: {
            _func: e => {
                const n = t(e[0]),
                    r = i(e[1]);
                return r < 0 ? null : n.repeat(r)
            },
            _signature: [{
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_NUMBER]
            }]
        },
        replace: {
            _func: e => {
                const n = t(e[0]),
                    r = i(e[1]),
                    s = i(e[2]),
                    l = t(e[3]);
                return r < 0 ? null : n.substr(0, r) + l + n.substr(r + s)
            },
            _signature: [{
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_STRING]
            }]
        },
        round: {
            _func: e => wt(i(e[0]), i(e[1])),
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }]
        },
        sqrt: {
            _func: e => {
                const t = Math.sqrt(i(e[0]));
                return Number.isNaN(t) ? null : t
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        stdevp: {
            _func: e => {
                const t = e[0] || [];
                if (0 === t.length) return null;
                const n = t.map(e => i(e)),
                    r = n.reduce((e, t) => e + t, 0) / t.length,
                    s = n.reduce((e, t) => e + t * t, 0) / t.length,
                    l = Math.sqrt(s - r * r);
                return Number.isNaN(l) ? null : l
            },
            _signature: [{
                types: [c.TYPE_ARRAY_NUMBER]
            }]
        },
        stdev: {
            _func: e => {
                const t = e[0] || [];
                if (t.length <= 1) return null;
                const n = t.map(e => i(e)),
                    r = n.reduce((e, t) => e + t, 0) / t.length,
                    s = n.reduce((e, t) => e + t * t, 0),
                    l = Math.sqrt((s - t.length * r * r) / (t.length - 1));
                return Number.isNaN(l) ? null : l
            },
            _signature: [{
                types: [c.TYPE_ARRAY_NUMBER]
            }]
        },
        trim: {
            _func: e => t(e[0]).split(" ").filter(e => e).join(" "),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        trunc: {
            _func: e => {
                const t = i(e[0]),
                    n = e.length > 1 ? i(e[1]) : 0;
                return (t >= 0 ? Math.floor : Math.ceil)(t * 10 ** n) / 10 ** n
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }]
        },
        charCode: {
            _func: e => {
                const t = i(e[0]);
                return Number.isInteger(t) ? String.fromCharCode(t) : null
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        codePoint: {
            _func: e => {
                const i = t(e[0]);
                return 0 === i.length ? null : i.codePointAt(0)
            },
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        datetime: {
            _func: e => {
                const n = i(e[0]),
                    r = i(e[1]),
                    s = i(e[2]),
                    l = e.length > 3 ? i(e[3]) : 0,
                    o = e.length > 4 ? i(e[4]) : 0,
                    a = e.length > 5 ? i(e[5]) : 0,
                    u = e.length > 6 ? i(e[6]) : 0,
                    c = e.length > 7 ? t(e[7]) : null;
                let h = new Date(n, r - 1, s, l, o, a, u);
                return c && (h = function(e, t) {
                    if (null === e) return null;
                    let i = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
                    return i += function(e, t) {
                        const i = new Intl.DateTimeFormat("en-US", {
                                timeZone: t,
                                timeZoneName: "longOffset"
                            }).format(e),
                            n = /GMT([+\-−])?(\d{1,2}):?(\d{0,2})?/.exec(i);
                        if (!n) return 0;
                        const [r, s, l] = n.slice(1), o = 60 * (60 * (s || 0) + 1 * (l || 0)) * 1e3;
                        return "-" === r ? -1 * o : o
                    }(e, t), new Date(i)
                }(h, c)), h.getTime() / 864e5
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }, {
                types: [c.TYPE_STRING],
                optional: !0
            }]
        },
        datedif: {
            _func: e => {
                const n = i(e[0]),
                    r = i(e[1]),
                    s = t(e[2]).toLowerCase();
                if (r === n) return 0;
                if (r < n) return null;
                if ("d" === s) return Math.floor(r - n);
                const l = new Date(864e5 * n),
                    o = new Date(864e5 * r),
                    a = o.getFullYear() - l.getFullYear();
                let u = o.getMonth() - l.getMonth();
                const c = o.getDate() - l.getDate();
                if ("y" === s) {
                    let e = a;
                    return u < 0 && (e -= 1), 0 === u && c < 0 && (e -= 1), e
                }
                if ("m" === s) return 12 * a + u + (c < 0 ? -1 : 0);
                if ("ym" === s) return c < 0 && (u -= 1), u <= 0 && a > 0 ? 12 + u : u;
                if ("yd" === s) return c < 0 && (u -= 1), o.setFullYear(u < 0 ? l.getFullYear() + 1 : l.getFullYear()), Math.floor((o.getTime() - l.getTime()) / 864e5);
                throw new TypeError(`Unrecognized unit parameter "${s}" for datedif()`)
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_STRING]
            }]
        },
        eomonth: {
            _func: e => {
                const t = i(e[0]),
                    n = i(e[1]),
                    r = new Date(864e5 * t);
                return new Date(r.getFullYear(), r.getMonth() + n + 1, 0).getTime() / 864e5
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }]
        },
        day: {
            _func: e => {
                const t = i(e[0]);
                return new Date(864e5 * t).getDate()
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        month: {
            _func: e => {
                const t = i(e[0]);
                return new Date(864e5 * t).getMonth() + 1
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        year: {
            _func: e => {
                const t = i(e[0]);
                return new Date(864e5 * t).getFullYear()
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        time: {
            _func: e => {
                const t = (3600 * i(e[0]) + 60 * i(e[1]) + i(e[2])) / 86400;
                return t < 0 ? null : t - Math.floor(t)
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER]
            }]
        },
        hour: {
            _func: e => {
                const t = i(e[0]) % 1;
                if (t < 0) return null;
                const n = wt(24 * t, 14);
                return Math.floor(n % 24)
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        minute: {
            _func: e => {
                const t = i(e[0]) % 1;
                if (t < 0) return null;
                const n = Math.round(1440 * t, 10);
                return Math.floor(n % 60)
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        second: {
            _func: e => {
                const t = i(e[0]) % 1;
                if (t < 0) return null;
                const n = wt(86400 * t, 10);
                return Math.floor(n % 60)
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }]
        },
        now: {
            _func: () => Date.now() / 864e5,
            _signature: []
        },
        today: {
            _func: () => Math.floor(Date.now() / 864e5),
            _signature: []
        },
        weekday: {
            _func: e => {
                const t = i(e[0]),
                    n = e.length > 1 ? i(e[1]) : 1,
                    r = new Date(864e5 * t).getDay();
                switch (n) {
                    case 1:
                        return r + 1;
                    case 2:
                        return (r + 6) % 7 + 1;
                    case 3:
                        return (r + 6) % 7;
                    default:
                        return null
                }
            },
            _signature: [{
                types: [c.TYPE_NUMBER]
            }, {
                types: [c.TYPE_NUMBER],
                optional: !0
            }]
        },
        entries: {
            _func: t => {
                const i = e(t[0]);
                return Object.entries(i)
            },
            _signature: [{
                types: [c.TYPE_NUMBER, c.TYPE_STRING, c.TYPE_ARRAY, c.TYPE_OBJECT, c.TYPE_BOOLEAN]
            }]
        },
        fromEntries: {
            _func: e => Object.fromEntries(e[0]),
            _signature: [{
                types: [c.TYPE_ARRAY_ARRAY]
            }]
        },
        split: {
            _func: e => {
                const i = t(e[0]),
                    n = t(e[1]);
                return i.split(n)
            },
            _signature: [{
                types: [c.TYPE_STRING]
            }, {
                types: [c.TYPE_STRING]
            }]
        },
        unique: {
            _func: t => {
                const i = t[0].map(t => e(t));
                return t[0].filter((t, n) => i.indexOf(e(t)) === n)
            },
            _signature: [{
                types: [c.TYPE_ARRAY]
            }]
        },
        encodeUrlComponent: {
            _func: e => encodeURIComponent(e[0]),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        encodeUrl: {
            _func: e => encodeURI(e[0]),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        decodeUrlComponent: {
            _func: e => decodeURIComponent(e[0]),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        },
        decodeUrl: {
            _func: e => decodeURI(e[0]),
            _signature: [{
                types: [c.TYPE_STRING]
            }]
        }
    }
}

function Mt(e, t, i, n, r, s, l) {
    const {
        TYPE_NUMBER: o,
        TYPE_ANY: a,
        TYPE_STRING: u,
        TYPE_ARRAY: h,
        TYPE_OBJECT: d,
        TYPE_BOOLEAN: p,
        TYPE_EXPREF: m,
        TYPE_NULL: _,
        TYPE_ARRAY_NUMBER: g,
        TYPE_ARRAY_STRING: f
    } = c;

    function v(t, i) {
        return n => {
            const s = e.visit(t, n);
            if (i.indexOf(r(s)) < 0) {
                const e = `TypeError: expected one of ${i}, received ${r(s)}`;
                throw new Error(e)
            }
            return s
        }
    }
    return {
        abs: {
            _func: e => Math.abs(e[0]),
            _signature: [{
                types: [o]
            }]
        },
        avg: {
            _func: e => {
                let t = 0;
                const i = e[0];
                return i.forEach(e => {
                    t += e
                }), t / i.length
            },
            _signature: [{
                types: [g]
            }]
        },
        ceil: {
            _func: e => Math.ceil(e[0]),
            _signature: [{
                types: [o]
            }]
        },
        contains: {
            _func: e => s(e[0]).indexOf(s(e[1])) >= 0,
            _signature: [{
                types: [u, h]
            }, {
                types: [a]
            }]
        },
        endsWith: {
            _func: e => {
                const t = s(e[0]),
                    i = s(e[1]);
                return -1 !== t.indexOf(i, t.length - i.length)
            },
            _signature: [{
                types: [u]
            }, {
                types: [u]
            }]
        },
        floor: {
            _func: e => Math.floor(e[0]),
            _signature: [{
                types: [o]
            }]
        },
        length: {
            _func: e => {
                const n = s(e[0]);
                return t(n) ? Object.keys(n).length : i(n) ? n.length : l(n).length
            },
            _signature: [{
                types: [u, h, d]
            }]
        },
        map: {
            _func: t => {
                const i = t[0];
                return t[1].map(t => e.visit(i, t))
            },
            _signature: [{
                types: [m]
            }, {
                types: [h]
            }]
        },
        reduce: {
            _func: t => {
                const i = t[0];
                return t[1].reduce((t, n, r, s) => e.visit(i, {
                    accumulated: t,
                    current: n,
                    index: r,
                    array: s
                }), 3 === t.length ? t[2] : null)
            },
            _signature: [{
                types: [m]
            }, {
                types: [h]
            }, {
                types: [a],
                optional: !0
            }]
        },
        max: {
            _func: e => {
                if (e[0].length > 0) {
                    const t = r(e[0][0]);
                    return e[0].reduce(t === o ? (e, t) => n(e) >= n(t) ? e : t : (e, t) => l(t).localeCompare(l(e)) < 0 ? e : t, e[0][0])
                }
                return null
            },
            _signature: [{
                types: [h, g, f]
            }]
        },
        merge: {
            _func: e => {
                const t = {};
                return e.forEach(e => {
                    Object.entries(e).forEach(([e, i]) => {
                        t[e] = i
                    })
                }), t
            },
            _signature: [{
                types: [d],
                variadic: !0
            }]
        },
        maxBy: {
            _func: e => {
                const t = e[0],
                    i = v(e[1], [o, u]);
                let n, r, s = -Infinity;
                return t.forEach(e => {
                    r = i(e), r > s && (s = r, n = e)
                }), n
            },
            _signature: [{
                types: [h]
            }, {
                types: [m]
            }]
        },
        sum: {
            _func: e => {
                let t = 0;
                return e[0].forEach(e => {
                    t += 1 * e
                }), t
            },
            _signature: [{
                types: [g]
            }]
        },
        startsWith: {
            _func: e => s(e[0]).startsWith(s(e[1])),
            _signature: [{
                types: [u]
            }, {
                types: [u]
            }]
        },
        min: {
            _func: e => {
                if (e[0].length > 0) {
                    if (r(e[0][0]) === o) return e[0].reduce((e, t) => n(e) <= n(t) ? e : t, e[0][0]);
                    const t = e[0];
                    let i = t[0];
                    for (let e = 1; e < t.length; e += 1) l(t[e]).localeCompare(l(i)) < 0 && (i = t[e]);
                    return i
                }
                return null
            },
            _signature: [{
                types: [h, g, f]
            }]
        },
        minBy: {
            _func: e => {
                const t = e[0],
                    i = v(e[1], [o, u]);
                let n, r, s = Infinity;
                return t.forEach(e => {
                    r = i(e), r < s && (s = r, n = e)
                }), n
            },
            _signature: [{
                types: [h]
            }, {
                types: [m]
            }]
        },
        type: {
            _func: e => ({
                [o]: "number",
                [u]: "string",
                [h]: "array",
                [d]: "object",
                [p]: "boolean",
                [m]: "expref",
                [_]: "null"
            }[r(e[0])]),
            _signature: [{
                types: [a]
            }]
        },
        keys: {
            _func: e => null === e[0] ? [] : Object.keys(e[0]),
            _signature: [{
                types: [a]
            }]
        },
        values: {
            _func: e => {
                const t = s(e[0]);
                return null === t ? [] : Object.values(t)
            },
            _signature: [{
                types: [a]
            }]
        },
        sort: {
            _func: e => {
                const t = e[0].slice(0);
                if (t.length > 0) {
                    const i = r(e[0][0]) === o ? n : l;
                    t.sort((e, t) => {
                        const n = i(e),
                            r = i(t);
                        return n < r ? -1 : n > r ? 1 : 0
                    })
                }
                return t
            },
            _signature: [{
                types: [h, f, g]
            }]
        },
        sortBy: {
            _func: t => {
                const i = t[0].slice(0);
                if (0 === i.length) return i;
                const n = t[1],
                    s = r(e.visit(n, i[0]));
                if ([o, u].indexOf(s) < 0) throw new Error("TypeError");
                const l = [];
                for (let e = 0; e < i.length; e += 1) l.push([e, i[e]]);
                l.sort((t, i) => {
                    const l = e.visit(n, t[1]),
                        o = e.visit(n, i[1]);
                    if (r(l) !== s) throw new Error(`TypeError: expected ${s}, received ${r(l)}`);
                    if (r(o) !== s) throw new Error(`TypeError: expected ${s}, received ${r(o)}`);
                    return l > o ? 1 : l < o ? -1 : t[0] - i[0]
                });
                for (let e = 0; e < l.length; e += 1)[, i[e]] = l[e];
                return i
            },
            _signature: [{
                types: [h]
            }, {
                types: [m]
            }]
        },
        join: {
            _func: e => e[1].join(e[0]),
            _signature: [{
                types: [u]
            }, {
                types: [f]
            }]
        },
        reverse: {
            _func: e => {
                const t = s(e[0]);
                if (r(t) === u) {
                    let e = "";
                    for (let i = t.length - 1; i >= 0; i -= 1) e += t[i];
                    return e
                }
                const i = e[0].slice(0);
                return i.reverse(), i
            },
            _signature: [{
                types: [u, h]
            }]
        },
        toArray: {
            _func: e => r(e[0]) === h ? e[0] : [e[0]],
            _signature: [{
                types: [a]
            }]
        },
        toString: {
            _func: e => r(e[0]) === u ? e[0] : JSON.stringify(e[0]),
            _signature: [{
                types: [a]
            }]
        },
        toNumber: {
            _func: e => {
                const t = r(e[0]);
                return t === o ? e[0] : t === u ? n(e[0]) : null
            },
            _signature: [{
                types: [a]
            }]
        },
        notNull: {
            _func: e => e.find(e => r(e) !== _) || null,
            _signature: [{
                types: [a],
                variadic: !0
            }]
        },
        zip: {
            _func: e => {
                const t = e.reduce((e, t) => Math.min(e, t.length), e[0].length),
                    i = new Array(t);
                for (let n = 0; n < t; n += 1) i[n] = [], e.forEach(e => {
                    i[n].push(e[n])
                });
                return i
            },
            _signature: [{
                types: [h],
                variadic: !0
            }]
        }
    }
}
const {
    TYPE_CLASS: xt,
    TYPE_ANY: Dt
} = c;
var jt = new function() {
    let t;

    function i(e) {
        return null == e ? "" : e.toString()
    }
    class n {
        addFunctions(n, r = {}) {
            this.functionTable = e({}, Mt(this._interpreter, k, j, t, M, P, i), Nt(P, i, t, n), r)
        }
        _validateArgs(e, n, r, s) {
            if (0 === r.length) return;
            let l;
            const o = r.filter(e => !e.optional).length;
            if (r[r.length - 1].variadic) {
                if (n.length < r.length) throw l = 1 === r.length ? " argument" : " arguments", new Error(`ArgumentError: ${e}() takes at least${r.length}${l} but received ${n.length}`)
            } else if (n.length < o || n.length > r.length) throw l = 1 === r.length ? " argument" : " arguments", new Error(`ArgumentError: ${e}() takes ${r.length}${l} but received ${n.length}`);
            if (!s) return;
            let a, u;
            const c = Math.min(r.length, n.length);
            for (let s = 0; s < c; s += 1) a = r[s].types, h = n[s], d = void 0, a.includes(xt) && null !== (d = h) && !Array.isArray(d) && "Object" !== d.constructor.name || a.includes(Dt) || (u = x(n[s]), n[s] = D(u, a, n[s], e, t, i));
            var h, d
        }
        callFunction(e, t, i, n, r = !0) {
            if (!Object.prototype.hasOwnProperty.call(this.functionTable, e)) throw new Error(`Unknown function: ${e}()`);
            const s = this.functionTable[e];
            return this._validateArgs(e, t, s._signature, r), s._func.call(this, t, i, n)
        }
    }
    this.compile = function(e, t = [], i = []) {
        let n;
        try {
            n = new Ot(t).parse(e, i)
        } catch (e) {
            throw i.push(e.toString()), e
        }
        return n
    }, this.search = function(e, r, s, l, o, a = [], u = "en-US") {
        const c = new n(l);
        c.debug = a, t = function(e, t = []) {
            return i => {
                const n = P(i);
                if (null === n) return null;
                if (n instanceof Array) return t.push("Converted array to zero"), 0;
                const r = typeof n;
                return "number" === r ? n : "string" === r ? e(n, t) : "boolean" === r ? n ? 1 : 0 : (t.push("Converted object to zero"), 0)
            }
        }(o || (e => {
            const t = +e;
            return Number.isNaN(t) ? 0 : t
        }), a);
        const h = new W(c, s, t, i, a, u);
        c._interpreter = h, c.addFunctions(a, l);
        try {
            return h.search(e, r)
        } catch (e) {
            throw a.push(e.message || e.toString()), e
        }
    }, this.strictDeepEqual = R
};
class kt {
    constructor(e, t = {}, i = null, n = [], r = [], s = "en-US") {
        this.expression = e, this.customFunctions = t, this.stringToNumber = i, this.node = jt.compile(e, n, r), this.debug = r, this.language = s
    }
    search(t, i) {
        return jt.search(this.node, t, i, e({}, this.customFunctions), this.stringToNumber, this.debug, this.language)
    }
}

function Pt() {
    return Pt = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var i = arguments[t];
            for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
        }
        return e
    }, Pt.apply(this, arguments)
}
console.timeEnd("script json-formula"), console.time("script af-core");
class Rt {
    constructor(e = "", t = []) {
        this.errorMessages = t, this.fieldName = e
    }
}
const St = e => new Map(Object.entries(e)),
    At = St({
        date: "date-input",
        "data-url": "file-input",
        binary: "file-input"
    }),
    It = St({
        number: "number-input",
        boolean: "checkbox",
        object: "panel",
        array: "panel",
        file: "file-input",
        "file[]": "file-input"
    }),
    $t = ["string[]", "boolean[]", "number[]", "array"],
    Ct = e => {
        const t = e.type || "string";
        return "enum" in e ? e.enum.length > 2 || $t.indexOf(t) > -1 ? "drop-down" : "checkbox" : "string" === t || "string[]" === t ? At.get(e.format) || "text-input" : It.get(t) || "text-input"
    },
    Lt = function(e) {
        return "file" === (null == e ? void 0 : e.type) || "file[]" === (null == e ? void 0 : e.type) || ("string" === (null == e ? void 0 : e.type) || "string[]" === (null == e ? void 0 : e.type)) && ("binary" === (null == e ? void 0 : e.format) || "data-url" === (null == e ? void 0 : e.format))
    };

function Bt(e, t) {
    let i;
    return e instanceof Array ? (i = [], i = e.map(e => Bt(e, t))) : "object" == typeof e && null !== e ? (i = {}, Object.entries(e).forEach(([e, n]) => {
        i[e] = Bt(n, t)
    })) : i = e, t && i && i.id && (i.id = t()), i
}
const Yt = e => JSON.stringify(e, null, 2);
class Ft {
    constructor(e, t, i) {
        this._metadata = i, this._payload = e, this._type = t
    }
    get type() {
        return this._type
    }
    get payload() {
        return this._payload
    }
    get metadata() {
        return this._metadata
    }
    get target() {
        return this._target
    }
    get isCustomEvent() {
        return !1
    }
    payloadToJson() {
        return this.payload
    }
    toJson() {
        return {
            payload: this.payloadToJson(),
            type: this.type,
            isCustomEvent: this.isCustomEvent
        }
    }
    toString() {
        return JSON.stringify(this.toJson())
    }
}
class qt extends Ft {
    constructor(e, t = !1) {
        super(e, "change", {
            dispatch: t
        })
    }
    withAdditionalChange(e) {
        return new qt(this.payload.changes.concat(e.payload.changes), this.metadata)
    }
}
class Vt extends Ft {
    constructor(e = {}) {
        super(e, "invalid", {})
    }
}
class Kt extends Ft {
    constructor(e = {}) {
        super(e, "valid", {})
    }
}
class Ut extends Ft {
    constructor(e = {}, t = !1) {
        super(e, "executeRule", {
            dispatch: t
        })
    }
}
const Gt = (e, t, i) => new qt({
    changes: [{
        propertyName: e,
        currentValue: t,
        prevValue: i
    }]
});
class Ht extends Ft {
    constructor(e, t = !1) {
        super(e, "initialize", {
            dispatch: t
        })
    }
}
class Wt extends Ft {
    constructor() {
        super({}, "load", {
            dispatch: !1
        })
    }
}
class zt extends Ft {
    constructor(e, t = !1) {
        super(e, "click", {
            dispatch: t
        })
    }
}
class Qt extends Ft {
    constructor(e, t = !1) {
        super(e, "validationComplete", {
            dispatch: t
        })
    }
}
class Jt extends Ft {
    constructor(e, t = !1) {
        super(e, "submit", {
            dispatch: t
        })
    }
}
class Xt extends Ft {
    constructor(e, t) {
        super({
            field: t,
            changes: e
        }, "fieldChanged")
    }
}
class Zt extends Ft {
    constructor(e, t = {}, i = !1) {
        super(t, e, {
            dispatch: i
        })
    }
    get isCustomEvent() {
        return !0
    }
}
class ei extends Ft {
    constructor(e) {
        super(e, "addItem")
    }
}
class ti extends Ft {
    constructor(e) {
        super(e, "removeItem")
    }
}
class ii {
    constructor(e, t, i = typeof t) {
        this.$_fields = [], this.$_name = e, this.$_value = t, this.$_type = i
    }
    valueOf() {
        return this.$_value
    }
    get $name() {
        return this.$_name
    }
    get $value() {
        return this.$_value
    }
    setValue(e, t, i) {
        this.$_value = e, this.$_fields.forEach(e => {
            i !== e && (e.value = t)
        })
    }
    get $type() {
        return this.$_type
    }
    $bindToField(e) {
        -1 === this.$_fields.indexOf(e) && this.$_fields.push(e)
    }
    $convertToDataValue() {
        return this
    }
    get $isDataGroup() {
        return !1
    }
}
const ni = Symbol("NullValue"),
    ri = new class extends ii {
        constructor() {
            super("", ni, "null")
        }
        setValue() {}
        $bindToField() {}
        $length() {
            return 0
        }
        $convertToDataValue() {
            return this
        }
        $addDataNode() {}
        $removeDataNode() {}
        $getDataNode() {
            return this
        }
        $containsDataNode() {
            return !1
        }
    };
class si extends ii {
    createEntry(e, t) {
        const i = t instanceof Array ? "array" : typeof t;
        return "object" == typeof t && null != t ? new si(e, t, i) : new ii(e, t, i)
    }
    constructor(e, t, i = typeof t) {
        super(e, t, i), this.$_items = t instanceof Array ? t.map((e, t) => this.createEntry(t, e)) : Object.fromEntries(Object.entries(t).map(([e, t]) => [e, this.createEntry(e, t)]))
    }
    get $value() {
        return "array" === this.$type ? Object.values(this.$_items).filter(e => void 0 !== e).map(e => e.$value) : Object.fromEntries(Object.values(this.$_items).filter(e => void 0 !== e).map(e => [e.$name, e.$value]))
    }
    get $length() {
        return Object.entries(this.$_items).length
    }
    $convertToDataValue() {
        return new ii(this.$name, this.$value, this.$type)
    }
    $addDataNode(e, t, i = !1) {
        if (t !== ri)
            if ("array" === this.$type) {
                const n = e;
                i ? this.$_items[e] = t : this.$_items.splice(n, 0, t)
            } else this.$_items[e] = t
    }
    $removeDataNode(e) {
        this.$_items[e] = void 0
    }
    $getDataNode(e) {
        if (this.$_items.hasOwnProperty(e)) return this.$_items[e]
    }
    $containsDataNode(e) {
        return this.$_items.hasOwnProperty(e) && void 0 !== this.$_items[e]
    }
    get $isDataGroup() {
        return !0
    }
}
const li = (e, t) => ({
        type: "Identifier",
        value: e,
        start: t
    }),
    oi = function(e) {
        return e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || "_" === e
    },
    ai = (e, t, i) => null === e && "$" === t[i],
    ui = (e, t) => {
        const i = e[t];
        return "$" === i ? e.length > t && oi(e[t + 1]) : i >= "a" && i <= "z" || i >= "A" && i <= "Z" || "_" === i
    },
    ci = e => e >= "0" && e <= "9";
class hi {
    constructor(e) {
        this._tokens = [], this._result_tokens = [], this.stream = e, this._current = 0
    }
    _consumeGlobal() {
        return this._current += 1, {
            type: "Global",
            start: 0,
            value: "$"
        }
    }
    _consumeUnquotedIdentifier(e) {
        const t = this._current;
        for (this._current += 1; this._current < e.length && oi(e[this._current]);) this._current += 1;
        return li(e.slice(t, this._current), t)
    }
    _consumeQuotedIdentifier(e) {
        const t = this._current;
        this._current += 1;
        const i = e.length;
        for (;
            '"' !== e[this._current] && this._current < i;) {
            let t = this._current;
            t += "\\" !== e[t] || "\\" !== e[t + 1] && '"' !== e[t + 1] ? 1 : 2, this._current = t
        }
        return this._current += 1, li(JSON.parse(e.slice(t, this._current)), t)
    }
    _consumeNumber(e) {
        const t = this._current;
        this._current += 1;
        const i = e.length;
        for (; ci(e[this._current]) && this._current < i;) this._current += 1;
        const n = e.slice(t, this._current);
        return {
            type: "Number",
            value: parseInt(n, 10),
            start: t
        }
    }
    _consumeBracket(e) {
        const t = this._current;
        let i;
        if (this._current += 1, !ci(e[this._current])) throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        if (i = this._consumeNumber(e).value, this._current < this.stream.length && "]" !== e[this._current]) throw new Error(`unexpected exception at position ${this._current}. Must be a character`);
        return this._current++, ((e, t) => ({
            type: "bracket",
            value: e,
            start: t
        }))(i, t)
    }
    tokenize() {
        const e = this.stream;
        for (; this._current < e.length;) {
            const t = this._tokens.length ? this._tokens.slice(-1)[0] : null;
            if (ai(t, e, this._current)) {
                const e = this._consumeGlobal();
                this._tokens.push(e), this._result_tokens.push(e)
            } else if (ui(e, this._current)) {
                const t = this._consumeUnquotedIdentifier(e);
                this._tokens.push(t), this._result_tokens.push(t)
            } else if ("." === e[this._current] && null != t && "DOT" !== t.type) this._tokens.push({
                type: "DOT",
                value: ".",
                start: this._current
            }), this._current += 1;
            else if ("[" === e[this._current]) {
                const t = this._consumeBracket(e);
                this._tokens.push(t), this._result_tokens.push(t)
            } else {
                if ('"' !== e[this._current]) {
                    const e = Math.max(0, this._current - 2),
                        t = Math.min(this.stream.length, this._current + 2);
                    throw new Error(`Exception at parsing stream ${this.stream.slice(e, t)}`)
                } {
                    const t = this._consumeQuotedIdentifier(e);
                    this._tokens.push(t), this._result_tokens.push(t)
                }
            }
        }
        return this._result_tokens
    }
}
const di = e => new hi(e).tokenize(),
    pi = (e, t, i) => {
        let n;
        n = "string" == typeof t ? di(t) : t;
        let r = e,
            s = 0;
        const l = (e, t, i) => null === t ? i : "bracket" === t.type ? new si(e.value, [], "array") : new si(e.value, {});
        for (; s < n.length && null != r;) {
            const t = n[s];
            if ("Global" === t.type) r = e;
            else if ("Identifier" === t.type) {
                if (!(r instanceof si && "object" === r.$type)) throw new Error(`Looking for ${t.value} in ${r.$value}`);
                if (r.$containsDataNode(t.value) && null !== r.$getDataNode(t.value).$value) r = r.$getDataNode(t.value);
                else if (i) {
                    const e = l(t, s < n.length - 1 ? n[s + 1] : null, i);
                    r.$addDataNode(t.value, e), r = e
                } else r = void 0
            } else if ("bracket" === t.type) {
                if (!(r instanceof si && "array" === r.$type)) throw new Error(`Looking for index ${t.value} in non array${r.$value}`); {
                    const e = t.value;
                    if (e < r.$length) r = r.$getDataNode(e);
                    else if (i) {
                        const o = l(t, s < n.length - 1 ? n[s + 1] : null, i);
                        r.$addDataNode(e, o), r = o
                    } else r = void 0
                }
            }
            s += 1
        }
        return r
    };
var mi = function(e, t, i, n) {
    var r, s = arguments.length,
        l = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, i, n);
    else
        for (var o = e.length - 1; o >= 0; o--)(r = e[o]) && (l = (s < 3 ? r(l) : s > 3 ? r(t, i, l) : r(t, i)) || l);
    return s > 3 && l && Object.defineProperty(t, i, l), l
};
const _i = ["value", "label", "description", "visible", "enabled", "readOnly", "enum", "enumNames", "required", "properties", "exclusiveMinimum", "exclusiveMaximum", "maxLength", "maximum", "maxItems", "minLength", "minimum", "minItems", "step"],
    gi = [..._i, "valid", "index", "activeChild"];
class fi {
    constructor(e, t) {
        this._action = e, this._target = t
    }
    get type() {
        return this._action.type
    }
    get payload() {
        return this._action.payload
    }
    get metadata() {
        return this._action.metadata
    }
    get target() {
        return this._target
    }
    get isCustomEvent() {
        return this._action.isCustomEvent
    }
    get originalAction() {
        return this._action.originalAction
    }
    toString() {
        return this._action.toString()
    }
}
const vi = Symbol("target"),
    yi = Symbol("qualifiedName");
class bi {
    get isContainer() {
        return !1
    }
    constructor(e, t) {
        this._callbacks = {}, this._dependents = [], this._tokens = [], this._options = t, this[yi] = null, this._jsonModel = Pt({}, e, {
            id: "id" in e ? e.id : this.form.getUniqueId()
        })
    }
    setupRuleNode() {
        const e = this;
        this._ruleNode = new Proxy(this.ruleNodeReference(), {
            get: (t, i) => e.getFromRule(t, i)
        })
    }
    ruleNodeReference() {
        return this
    }
    getRuleNode() {
        return this._ruleNode
    }
    getFromRule(e, t) {
        if (t === Symbol.toPrimitive || "valueOf" === t && !e.hasOwnProperty("valueOf")) return this.valueOf;
        if (t === vi) return this;
        if ("string" == typeof t)
            if (t.startsWith("$")) {
                if ("function" != typeof this[t = t.substr(1)]) {
                    const e = this[t];
                    return e instanceof bi ? e.getRuleNode() : e instanceof Array ? e.map(e => e instanceof bi ? e.getRuleNode() : e) : e
                }
            } else {
                if (e.hasOwnProperty(t)) return e[t];
                if ("function" == typeof e[t]) return e[t]
            }
    }
    get id() {
        return this._jsonModel.id
    }
    get index() {
        return this.parent.indexOf(this)
    }
    get parent() {
        return this._options.parent
    }
    get type() {
        return this._jsonModel.type
    }
    get fieldType() {
        return this._jsonModel.fieldType || "text-input"
    }
    get ":type" () {
        return this._jsonModel[":type"] || this.fieldType
    }
    get name() {
        return this._jsonModel.name
    }
    get description() {
        return this._jsonModel.description
    }
    set description(e) {
        this._setProperty("description", e)
    }
    get dataRef() {
        return this._jsonModel.dataRef
    }
    get visible() {
        return this._jsonModel.visible
    }
    set visible(e) {
        if (e !== this._jsonModel.visible) {
            const t = Gt("visible", e, this._jsonModel.visible);
            this._jsonModel.visible = e, this.notifyDependents(t)
        }
    }
    get form() {
        return this._options.form
    }
    get ruleEngine() {
        return this.form.ruleEngine
    }
    get label() {
        return this._jsonModel.label
    }
    set label(e) {
        if (e !== this._jsonModel.label) {
            const t = Gt("label", e, this._jsonModel.label);
            this._jsonModel = Pt({}, this._jsonModel, {
                label: e
            }), this.notifyDependents(t)
        }
    }
    get uniqueItems() {
        return this._jsonModel.uniqueItems
    }
    isTransparent() {
        var e;
        const t = "array" === (null == (e = this.parent) ? void 0 : e._jsonModel.type);
        return !this._jsonModel.name && !t
    }
    getState() {
        return Pt({}, this._jsonModel, {
            ":type": this[":type"]
        })
    }
    subscribe(e, t = "change") {
        return this._callbacks[t] = this._callbacks[t] || [], this._callbacks[t].push(e), {
            unsubscribe: () => {
                this._callbacks[t] = this._callbacks[t].filter(t => t !== e)
            }
        }
    }
    _addDependent(e) {
        if (void 0 === this._dependents.find(({
                node: t
            }) => t === e)) {
            const t = this.subscribe(t => {
                const i = [...gi, "items"],
                    n = t.payload.changes.findIndex(e => i.indexOf(e.propertyName) > -1) > -1;
                n && e.dispatch(new Ut)
            });
            this._dependents.push({
                node: e,
                subscription: t
            })
        }
    }
    removeDependent(e) {
        const t = this._dependents.findIndex(({
            node: t
        }) => t === e);
        t > -1 && (this._dependents[t].subscription.unsubscribe(), this._dependents.splice(t, 1))
    }
    queueEvent(e) {
        const t = new fi(e, this);
        this.form.getEventQueue().queue(this, t, ["valid", "invalid"].indexOf(t.type) > -1)
    }
    dispatch(e) {
        this.queueEvent(e), this.form.getEventQueue().runPendingQueue()
    }
    notifyDependents(e) {
        (this._callbacks[e.type] || []).forEach(t => {
            t(new fi(e, this))
        })
    }
    _setProperty(e, t, i = !0) {
        const n = this._jsonModel[e];
        let r = !1;
        if (r = null !== t && null !== n && "object" == typeof t && "object" == typeof n ? JSON.stringify(t) === JSON.stringify(n) : n === t, !r) {
            this._jsonModel[e] = t;
            const r = Gt(e, t, n);
            return i && this.notifyDependents(r), r.payload.changes
        }
        return []
    }
    _bindToDataModel(e) {
        if ("$form" === this.id) return void(this._data = e);
        const t = this._jsonModel.dataRef;
        let i, n = e,
            r = "";
        if (null === t) i = ri;
        else if (void 0 !== t) {
            0 === this._tokens.length && (this._tokens = di(t));
            let s = e;
            if ("Global" === this._tokens[0].type && (s = this.form.getDataNode()), void 0 !== s) {
                const e = this._tokens[this._tokens.length - 1].value,
                    t = this.defaultDataModel(e);
                i = pi(s, this._tokens, t), n = pi(s, this._tokens.slice(0, -1)), r = e
            }
        } else if (e !== ri) {
            n = e;
            const t = this._jsonModel.name || "",
                s = "array" === e.$type ? this.index : t;
            if (r = s, "" !== s) {
                const t = this.defaultDataModel(s);
                void 0 !== t && (i = e.$getDataNode(s), void 0 === i && (i = t, e.$addDataNode(s, i)))
            } else i = void 0
        }
        var s, l;
        i && (this.isContainer || n === ri || i === ri || (i = null == (l = i) ? void 0 : l.$convertToDataValue(), n.$addDataNode(r, i, !0)), null == (s = i) || s.$bindToField(this), this._data = i)
    }
    getDataNode() {
        return this._data
    }
    get properties() {
        return this._jsonModel.properties || {}
    }
    set properties(e) {
        this._setProperty("properties", Pt({}, e))
    }
    getNonTransparentParent() {
        let e = this.parent;
        for (; null != e && e.isTransparent();) e = e.parent;
        return e
    }
    _initialize() {
        if (void 0 === this._data) {
            let e, t = this.parent;
            do {
                e = t.getDataNode(), t = t.parent
            } while (void 0 === e);
            this._bindToDataModel(e)
        }
    }
    _applyUpdates(e, t) {
        return e.reduce((e, i) => {
            const n = this._setProperty(i, t[i], !1);
            return n.length > 0 && (e[i] = n[0]), e
        }, {})
    }
    get qualifiedName() {
        if (this.isTransparent()) return null;
        if (null !== this[yi]) return this[yi];
        const e = this.getNonTransparentParent();
        return this[yi] = e && "array" === e.type ? `${e.qualifiedName}[${this.index}]` : `${e.qualifiedName}.${this.name}`, this[yi]
    }
    focus() {
        this.parent && (this.parent.activeChild = this)
    }
}
mi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], bi.prototype, "index", null), mi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], bi.prototype, "description", null), mi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], bi.prototype, "visible", null), mi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], bi.prototype, "label", null), mi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], bi.prototype, "properties", null);
class Ei extends bi {
    constructor(...e) {
        super(...e), this._events = {}, this._rules = {}
    }
    get rules() {
        return this._jsonModel.rules || {}
    }
    getCompiledRule(e, t) {
        if (!(e in this._rules)) {
            const i = t || this.rules[e];
            if (!("string" == typeof i && i.length > 0)) throw new Error(`only expression strings are supported. ${typeof i} types are not supported`);
            try {
                this._rules[e] = this.ruleEngine.compileRule(i)
            } catch (t) {
                this.form.logger.error(`Unable to compile rule \`"${e}" : "${i}"\` Exception : ${t}`)
            }
        }
        return this._rules[e]
    }
    getCompiledEvent(e) {
        if (!(e in this._events)) {
            var t;
            let i = null == (t = this._jsonModel.events) ? void 0 : t[e];
            "string" == typeof i && i.length > 0 && (i = [i]), void 0 !== i && i.length > 0 && (this._events[e] = i.map(t => {
                try {
                    return this.ruleEngine.compileRule(t)
                } catch (t) {
                    this.form.logger.error(`Unable to compile expression \`"${e}" : "${i}"\` Exception : ${t}`)
                }
                return null
            }).filter(e => null !== e))
        }
        return this._events[e] || []
    }
    applyUpdates(e) {
        Object.entries(e).forEach(([e, t]) => {
            if (e in _i || e in this && "function" != typeof this[e]) try {
                this[e] = t
            } catch (e) {
                console.error(e)
            }
        })
    }
    executeAllRules(e) {
        const t = Object.entries(this.rules);
        if (t.length > 0) {
            const i = this.getExpressionScope();
            t.forEach(([t, n]) => {
                const r = this.getCompiledRule(t, n);
                if (r) {
                    const n = this.ruleEngine.execute(r, i, e, !0);
                    _i.indexOf(t) > -1 ? this[t] = n : this.form.logger.warn(`${t} is not a valid editable property.`)
                }
            })
        }
    }
    getExpressionScope() {
        const e = this.getNonTransparentParent(),
            t = {
                self: this.getRuleNode(),
                siblings: (null == e ? void 0 : e.ruleNodeReference()) || {}
            },
            i = new Proxy(t, {
                get: (e, t) => {
                    if (t === Symbol.toStringTag) return "Object";
                    if (t.startsWith("$")) {
                        const i = e.self[t];
                        return i instanceof bi ? i.getRuleNode() : i instanceof Array ? i.map(e => e instanceof bi ? e.getRuleNode() : e) : i
                    }
                    return t in e.siblings ? e.siblings[t] : e.self[t]
                },
                has: (e, t) => void 0 !== e.self[t] || void 0 !== e.siblings[t]
            });
        return i
    }
    executeEvent(e, t) {
        let i;
        t && (i = this.ruleEngine.execute(t, this.getExpressionScope(), e)), void 0 !== i && null != i && this.applyUpdates(i)
    }
    executeRule(e, t) {
        void 0 === e.payload.ruleName && this.executeAllRules(t)
    }
    executeExpression(e) {
        const t = {
                form: this.form,
                $form: this.form.getRuleNode(),
                $field: this.getRuleNode(),
                field: this
            },
            i = this.ruleEngine.compileRule(e);
        return this.ruleEngine.execute(i, this.getExpressionScope(), t)
    }
    executeAction(e) {
        const t = {
                form: this.form,
                $form: this.form.getRuleNode(),
                $field: this.getRuleNode(),
                field: this,
                $event: {
                    type: e.type,
                    payload: e.payload,
                    target: this.getRuleNode()
                }
            },
            i = e.isCustomEvent ? `custom_${e.type}` : e.type;
        this.getCompiledEvent(e.isCustomEvent ? `custom:${e.type}` : e.type).forEach(e => this.executeEvent(t, e)), i in this && "function" == typeof this[i] && this[i](e, t), this.notifyDependents(e)
    }
}
var Ti = function(e, t, i, n) {
    var r, s = arguments.length,
        l = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, i, n);
    else
        for (var o = e.length - 1; o >= 0; o--)(r = e[o]) && (l = (s < 3 ? r(l) : s > 3 ? r(t, i, l) : r(t, i)) || l);
    return s > 3 && l && Object.defineProperty(t, i, l), l
};
class Oi extends Ei {
    constructor(...e) {
        super(...e), this._children = [], this._itemTemplate = null, this._activeChild = null
    }
    ruleNodeReference() {
        return this._childrenReference
    }
    get items() {
        return this._children
    }
    get maxItems() {
        return this._jsonModel.maxItems
    }
    set maxItems(e) {
        this._jsonModel.maxItems = e;
        const t = this._children.length,
            i = Math.min(t - e, t - (this._jsonModel.minItems || 1));
        if (i > 0) {
            for (let t = 0; t < i; t++) this.getDataNode().$removeDataNode(e + t), this._childrenReference.pop();
            const t = this._children.splice(e, i);
            this.notifyDependents(Gt("items", t, null))
        }
    }
    get minItems() {
        return this._jsonModel.minItems
    }
    hasDynamicItems() {
        return null != this._itemTemplate
    }
    get isContainer() {
        return !0
    }
    getState() {
        return Pt({}, this._jsonModel, {
            ":type": this[":type"],
            items: this._children.map(e => Pt({}, e.getState()))
        })
    }
    _addChildToRuleNode(e, t) {
        const i = this,
            {
                parent: n = this
            } = t,
            r = "array" == n.type ? n._children.length + "" : e.name || "";
        r.length > 0 && Object.defineProperty(n._childrenReference, r, {
            get: () => (e.isContainer && e.hasDynamicItems() && i.ruleEngine.trackDependency(e), i.hasDynamicItems() ? (i.ruleEngine.trackDependency(i), void 0 !== this._children[r] ? this._children[r].getRuleNode() : void 0) : e.getRuleNode()),
            configurable: !0,
            enumerable: !0
        })
    }
    _addChild(e, t, i = !1) {
        let n = this;
        for (; null != n && n.isTransparent();) n = n.parent;
        ("number" != typeof t || t > n._children.length) && (t = this._children.length);
        const r = this.form,
            s = Pt({
                index: t
            }, Bt(e, i ? () => r.getUniqueId() : void 0)),
            l = this._createChild(s, {
                parent: this,
                index: t
            });
        return this._addChildToRuleNode(l, {
            parent: n
        }), t === this._children.length ? this._children.push(l) : this._children.splice(t, 0, l), l
    }
    indexOf(e) {
        return this._children.indexOf(e)
    }
    defaultDataModel(e) {
        const t = this._jsonModel.type || void 0;
        if (void 0 !== t) return new si(e, "array" === t ? [] : {}, t)
    }
    _initialize() {
        super._initialize();
        const e = this._jsonModel.items;
        if (this._jsonModel.items = [], this._childrenReference = "array" == this._jsonModel.type ? [] : {}, "array" == this._jsonModel.type && 1 === e.length && null != this.getDataNode()) {
            this._itemTemplate = Bt(e[0]), "number" != typeof this._jsonModel.minItems && (this._jsonModel.minItems = 0), "number" != typeof this._jsonModel.maxItems && (this._jsonModel.maxItems = -1), "number" != typeof this._jsonModel.initialItems && (this._jsonModel.initialItems = Math.max(1, this._jsonModel.minItems));
            for (let e = 0; e < this._jsonModel.initialItems; e++) this._addChild(this._itemTemplate)._initialize()
        } else e.length > 0 && (e.forEach(e => {
            this._addChild(e)._initialize()
        }), this._jsonModel.minItems = this._children.length, this._jsonModel.maxItems = this._children.length, this._jsonModel.initialItems = this._children.length);
        this.setupRuleNode()
    }
    addItem(e) {
        if ("addItem" === e.type && null != this._itemTemplate && (-1 === this._jsonModel.maxItems || this._children.length < this._jsonModel.maxItems)) {
            const t = this.getDataNode();
            let i = e.payload;
            ("number" != typeof i || i > this._children.length) && (i = this._children.length);
            const n = this._addChild(this._itemTemplate, e.payload, !0),
                r = n.defaultDataModel(i);
            r && t.$addDataNode(i, r), n._initialize(), this.notifyDependents(Gt("items", n.getState, null)), n.dispatch(new Ht), n.dispatch(new Ut);
            for (let e = i + 1; e < this._children.length; e++) this._children[e].dispatch(new Ut)
        }
    }
    removeItem(e) {
        if ("removeItem" === e.type && null != this._itemTemplate) {
            if (0 == this._children.length) return;
            const t = "number" == typeof e.payload ? e.payload : this._children.length - 1,
                i = this._children[t].getState();
            if (this._children.length > this._jsonModel.minItems) {
                this._childrenReference.pop(), this._children.splice(t, 1), this.getDataNode().$removeDataNode(t);
                for (let e = t; e < this._children.length; e++) this._children[e].dispatch(new Ut);
                this.notifyDependents(Gt("items", null, i))
            }
        }
    }
    queueEvent(e) {
        var t;
        super.queueEvent(e), null != (t = e.metadata) && t.dispatch && this.items.forEach(t => {
            t.queueEvent(e)
        })
    }
    validate() {
        return this.items.flatMap(e => e.validate()).filter(e => "" !== e.fieldName)
    }
    dispatch(e) {
        super.dispatch(e)
    }
    importData(e) {
        this._bindToDataModel(e);
        const t = this.getDataNode() || e;
        this.syncDataAndFormModel(t)
    }
    syncDataAndFormModel(e) {
        if ("array" === (null == e ? void 0 : e.$type) && null != this._itemTemplate) {
            const t = null == e ? void 0 : e.$value.length,
                i = this._children.length,
                n = this._jsonModel.minItems;
            let r = Math.min(t - i, (-1 === this._jsonModel.maxItems ? t : this._jsonModel.maxItems) - i);
            const s = Math.min(i - t, i - n);
            for (; r > 0;) r--, this._addChild(this._itemTemplate)._initialize();
            if (s > 0) {
                this._children.splice(t, s);
                for (let e = 0; e < s; e++) this._childrenReference.pop()
            }
        }
        this._children.forEach(t => {
            t.importData(e)
        })
    }
    get activeChild() {
        return this._activeChild
    }
    set activeChild(e) {
        if (e !== this._activeChild) {
            let t = this._activeChild;
            for (; t instanceof Oi;) {
                const e = t.activeChild;
                t.activeChild = null, t = e
            }
            const i = Gt("activeChild", e, this._activeChild);
            this._activeChild = e, this.parent && null !== e && (this.parent.activeChild = this), this._jsonModel.activeChild = null == e ? void 0 : e.id, this.notifyDependents(i)
        }
    }
}
Ti([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Oi.prototype, "maxItems", null), Ti([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Oi.prototype, "minItems", null), Ti([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Oi.prototype, "activeChild", null);
class wi {
    constructor(e) {
        this._jsonModel = Pt({}, e)
    }
    getP(e, t) {
        return ((e, t, i) => {
            if (t in e) return e[t];
            if (!t.startsWith(":")) {
                const i = `:${t}`;
                if (i in e) return e[i]
            }
            return i
        })(this._jsonModel, e, t)
    }
    get isContainer() {
        return !1
    }
}
class Ni extends wi {
    get version() {
        return this.getP("version", "")
    }
    get locale() {
        return this.getP("locale", "")
    }
    get grammar() {
        return this.getP("grammar", "")
    }
}
class Mi {
    constructor(e) {
        this.type = "application/octet-stream", this.name = "unknown", this.size = 0, Object.assign(this, e)
    }
    toJSON() {
        return {
            name: this.name,
            size: this.size,
            type: this.type,
            data: this.data.toString()
        }
    }
    equals(e) {
        return this.data === e.data && this.type === e.type && this.name === e.name && this.size === e.size
    }
}
const xi = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".split(""),
    Di = /^(\d*\.?\d+)(\\?(?=[KMGT])([KMGT])(?:i?B)?|B?)$/i,
    ji = e => {
        const t = [];
        for (let i = 0; i <= e; i++) {
            const e = Math.floor(Math.random() * xi.length);
            t.push(xi[e])
        }
        return t.join("")
    },
    ki = e => {
        const t = e.items || [];
        return null == t ? void 0 : t.reduce((e, t) => {
            let i = null;
            if (t.isContainer) i = ki(t);
            else if (Lt(t.getState())) {
                i = {};
                const e = t.name || "",
                    n = null != t.dataRef ? t.dataRef : e.length > 0 ? t.name : void 0;
                t.value instanceof Array ? i[t.id] = t.value.map(e => Pt({}, e, {
                    dataRef: n
                })) : null != t.value && (i[t.id] = Pt({}, t.value, {
                    dataRef: n
                }))
            }
            return Object.assign(e, i)
        }, {})
    },
    Pi = e => {
        let t = 0;
        if ("string" == typeof e) {
            const i = Di.exec(e.trim());
            null != i && (t = Ri(parseFloat(i[1]), (i[2] || "kb").toUpperCase()))
        }
        return t
    },
    Ri = (e, t) => {
        const i = Math.pow(1024, {
            KB: 1,
            MB: 2,
            GB: 3,
            TB: 4
        }[t]);
        return Math.round(e * i)
    },
    Si = e => {
        const t = /^data:([a-z]+\/[a-z0-9-+.]+)?(?:;name=([^;]+))?(;base64)?,(.+)$/.exec(e);
        if (null !== t) {
            const e = t[1] || "",
                i = t[2] || "unknown";
            if ("string" == typeof t[3]) {
                const n = atob(t[4]),
                    r = [];
                for (let e = 0; e < n.length; e++) r.push(n.charCodeAt(e));
                return {
                    name: i,
                    blob: new window.Blob([new Uint8Array(r)], {
                        type: e
                    })
                }
            }
            return {
                name: i,
                blob: new window.Blob([t[4]], {
                    type: e
                })
            }
        }
        return null
    },
    Ai = /^(\d{4})-(\d{1,2})-(\d{1,2})$/,
    Ii = /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/,
    $i = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Ci = e => null != Ii.exec(e.trim()),
    Li = e => {
        let t = parseFloat(e);
        const i = !isNaN(t);
        return i || (t = e), {
            value: t,
            valid: i
        }
    },
    Bi = e => {
        let t = parseFloat(e);
        const i = !isNaN(t) && Math.round(t) === t;
        return i || (t = e), {
            value: t,
            valid: i
        }
    },
    Yi = e => null == e || e instanceof Array ? e : [e],
    Fi = e => {
        const t = "boolean" == typeof e || "true" === e || "false" === e;
        return {
            valid: t,
            value: "boolean" == typeof e ? e : t ? "true" === e : e
        }
    },
    qi = e => {
        const t = (e => {
                if (null !== e) {
                    let c = null;
                    if (e instanceof Mi) c = e;
                    else if ("undefined" != typeof File && e instanceof File) c = {
                        name: e.name,
                        type: e.type,
                        size: e.size,
                        data: e
                    };
                    else if ("string" == typeof e && Ci(e)) {
                        const t = Si(e);
                        if (null !== t) {
                            const {
                                blob: e,
                                name: i
                            } = t;
                            c = {
                                name: i,
                                type: e.type,
                                size: e.size,
                                data: e
                            }
                        }
                    } else {
                        var t, i;
                        let h = e;
                        try {
                            h = JSON.parse(e), c = h
                        } catch (e) {}
                        if ("string" == typeof(null == (t = h) ? void 0 : t.data) && Ci(null == (i = h) ? void 0 : i.data)) {
                            var n;
                            const e = Si(null == (n = h) ? void 0 : n.data);
                            if (null !== e) {
                                var r, s;
                                const t = e.blob;
                                c = {
                                    name: null == (r = h) ? void 0 : r.name,
                                    type: null == (s = h) ? void 0 : s.type,
                                    size: t.size,
                                    data: t
                                }
                            }
                        } else if ("string" == typeof h) c = {
                            name: h.split("/").pop(),
                            type: "application/octet-stream",
                            size: 0,
                            data: h
                        };
                        else if ("object" == typeof h) {
                            var l, o, a, u;
                            c = {
                                name: null == (l = h) ? void 0 : l.name,
                                type: null == (o = h) ? void 0 : o.type,
                                size: null == (a = h) ? void 0 : a.size,
                                data: null == (u = h) ? void 0 : u.data
                            }
                        }
                    }
                    return null !== c && null != c.data ? new Mi(c) : null
                }
                return null
            })(e),
            i = null !== t;
        return {
            value: i ? t : e,
            valid: i
        }
    },
    Vi = (e, t) => {
        const i = Yi(e);
        return null == i ? [
            [],
            [i]
        ] : i.reduce((e, i) => {
            if (0 == e[1].length) {
                const n = t(i);
                e[n.valid ? 0 : 1].push(n.value)
            }
            return e
        }, [
            [],
            []
        ])
    },
    Ki = {
        date: ["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "format"],
        string: ["minLength", "maxLength", "pattern"],
        number: ["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum"],
        array: ["minItems", "maxItems", "uniqueItems"],
        file: ["accept", "maxFileSize"]
    },
    Ui = {
        type: (e, t) => {
            let i = t;
            if (null == t) return {
                valid: !0,
                value: t
            };
            let n, r = !0;
            switch (e) {
                case "string":
                    r = !0, i = t.toString();
                    break;
                case "string[]":
                    i = Yi(t);
                    break;
                case "number":
                    n = Li(t), i = n.value, r = n.valid;
                    break;
                case "boolean":
                    n = Fi(t), r = n.valid, i = n.value;
                    break;
                case "integer":
                    n = Bi(t), r = n.valid, i = n.value;
                    break;
                case "integer[]":
                    n = Vi(t, Bi), r = 0 === n[1].length, i = r ? n[0] : t;
                    break;
                case "file":
                    n = qi(t instanceof Array ? t[0] : t), r = n.valid, i = n.value;
                    break;
                case "file[]":
                    n = Vi(t, qi), r = 0 === n[1].length, i = r ? n[0] : t;
                    break;
                case "number[]":
                    n = Vi(t, Li), r = 0 === n[1].length, i = r ? n[0] : t;
                    break;
                case "boolean[]":
                    n = Vi(t, Fi), r = 0 === n[1].length, i = r ? n[0] : t
            }
            return {
                valid: r,
                value: i
            }
        },
        format: (e, t) => {
            let i = !0;
            const n = t;
            if (null === t) return {
                value: n,
                valid: i
            };
            let r;
            switch (e) {
                case "date":
                    if (r = Ai.exec((t || "").trim()), null != r) {
                        const [e, t, n, s] = r, [l, o] = [+n, +s], a = (e => e % 400 == 0 || e % 4 == 0 && e % 100 != 0)(+t);
                        i = l >= 1 && l <= 12 && o >= 1 && o <= ((e, t) => e && 2 == t ? 29 : $i[t - 1])(a, l)
                    } else i = !1;
                    break;
                case "data-url":
                    i = !0
            }
            return {
                valid: i,
                value: n
            }
        },
        minimum: (e, t) => ({
            valid: t >= e,
            value: t
        }),
        maximum: (e, t) => ({
            valid: t <= e,
            value: t
        }),
        exclusiveMinimum: (e, t) => ({
            valid: t > e,
            value: t
        }),
        exclusiveMaximum: (e, t) => ({
            valid: t < e,
            value: t
        }),
        minItems: (e, t) => ({
            valid: t instanceof Array && t.length >= e,
            value: t
        }),
        maxItems: (e, t) => ({
            valid: t instanceof Array && t.length <= e,
            value: t
        }),
        uniqueItems: (e, t) => ({
            valid: !e || t instanceof Array && t.length === new Set(t).size,
            value: t
        }),
        minLength: (e, t) => Pt({}, Ui.minimum(e, "string" == typeof t ? t.length : 0), {
            value: t
        }),
        maxLength: (e, t) => Pt({}, Ui.maximum(e, "string" == typeof t ? t.length : 0), {
            value: t
        }),
        pattern: (e, t) => {
            let i;
            return i = "string" == typeof e ? new RegExp(e) : e, {
                valid: i.test(t),
                value: t
            }
        },
        required: (e, t) => ({
            valid: !e || null != t && "" !== t,
            value: t
        }),
        enum: (e, t) => ({
            valid: e.indexOf(t) > -1,
            value: t
        }),
        accept: (e, t) => e && 0 !== e.length && null != t ? {
            valid: !(t instanceof Array ? t : [t]).some(t => {
                return !(!(i = t.type) || e.some(e => {
                    const t = e.trim(),
                        n = t.split("/")[0],
                        r = t.split(".")[1];
                    return t.includes("*") && i.startsWith(n) || t.includes(".") && i.endsWith(r) || t === i
                }));
                var i
            }),
            value: t
        } : {
            valid: !0,
            value: t
        },
        maxFileSize: (e, t) => {
            const i = "string" == typeof e ? Pi(e) : e;
            return {
                valid: !(t instanceof Mi) || t.size <= i,
                value: t
            }
        }
    };
var Gi = function(e, t, i, n) {
    var r, s = arguments.length,
        l = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(e, t, i, n);
    else
        for (var o = e.length - 1; o >= 0; o--)(r = e[o]) && (l = (s < 3 ? r(l) : s > 3 ? r(t, i, l) : r(t, i)) || l);
    return s > 3 && l && Object.defineProperty(t, i, l), l
};
class Hi extends Ei {
    constructor(e, t) {
        super(e, t), this._ruleNodeReference = [], this._applyDefaults(), this.queueEvent(new Ht), this.queueEvent(new Ut)
    }
    _initialize() {
        super._initialize(), this.setupRuleNode()
    }
    ruleNodeReference() {
        var e;
        return this._ruleNodeReference = null != (e = this.type) && e.endsWith("[]") ? [] : this, this._ruleNodeReference
    }
    _getDefaults() {
        return {
            readOnly: !1,
            enabled: !0,
            visible: !0,
            type: this._getFallbackType()
        }
    }
    _getFallbackType() {
        if ("string" != typeof this._jsonModel.type) {
            const e = this.enum;
            return e && e.length > 0 ? typeof e[0] : "string"
        }
    }
    _applyDefaults() {
        if (Object.entries(this._getDefaults()).map(([e, t]) => {
                void 0 === this._jsonModel[e] && void 0 !== t && (this._jsonModel[e] = t)
            }), void 0 === this._jsonModel.value) {
            const e = Ui.type(this.getInternalType() || "string", this._jsonModel.default);
            this._jsonModel.value = e.value
        }
        void 0 === this._jsonModel.fieldType && (this._jsonModel.viewType ? (this._jsonModel.viewType.startsWith("custom:") ? this.form.logger.error("viewType property has been removed. For custom types, use :type property") : this.form.logger.error("viewType property has been removed. Use fieldType property"), this._jsonModel.fieldType = this._jsonModel.viewType) : this._jsonModel.fieldType = Ct(this._jsonModel)), void 0 === this._jsonModel.enum && "boolean" === this._jsonModel.type && (this._jsonModel.enum = [!0, !1]), "number" == typeof this._jsonModel.step && "number" === this._jsonModel.type || (this._jsonModel.step = void 0)
    }
    get editFormat() {
        return this._jsonModel.editFormat
    }
    get displayFormat() {
        return this._jsonModel.displayFormat
    }
    get placeholder() {
        return this._jsonModel.placeholder
    }
    get readOnly() {
        return this._jsonModel.readOnly
    }
    set readOnly(e) {
        this._setProperty("readOnly", e)
    }
    get language() {
        return Intl.DateTimeFormat().resolvedOptions().locale
    }
    get enabled() {
        return this._jsonModel.enabled
    }
    set enabled(e) {
        this._setProperty("enabled", e)
    }
    get valid() {
        return this._jsonModel.valid
    }
    get emptyValue() {
        return "null" === this._jsonModel.emptyValue ? null : "" === this._jsonModel.emptyValue && "string" === this.type ? "" : void 0
    }
    get enum() {
        return this._jsonModel.enum
    }
    set enum(e) {
        this._setProperty("enum", e)
    }
    get enumNames() {
        return this._jsonModel.enumNames
    }
    set enumNames(e) {
        this._setProperty("enumNames", e)
    }
    get required() {
        return this._jsonModel.required || !1
    }
    set required(e) {
        this._setProperty("required", e)
    }
    get maximum() {
        return this._jsonModel.maximum
    }
    set maximum(e) {
        this._setProperty("maximum", e)
    }
    get minimum() {
        return this._jsonModel.minimum
    }
    set minimum(e) {
        this._setProperty("minimum", e)
    }
    isEmpty() {
        return null == this._jsonModel.value || "" === this._jsonModel.value
    }
    get editValue() {
        const e = this.editFormat;
        return "date" == this.format && null != this.value && !1 !== this.valid ? formatDate(new Date(this.value), this.language, e) : this.value
    }
    get displayValue() {
        const e = this.displayFormat;
        return "date" == this.format && null != this.value && !1 !== this.valid ? formatDate(new Date(this.value), this.language, e) : this.value
    }
    getDataNodeValue(e) {
        return this.isEmpty() ? this.emptyValue : e
    }
    get value() {
        return void 0 === this._jsonModel.value ? null : this._jsonModel.value
    }
    set value(e) {
        const t = this._getConstraintObject(),
            i = t.type(this.getInternalType() || "string", e),
            n = this._setProperty("value", i.value, !1);
        let r = {
            valid: !0
        };
        if (n.length > 0) {
            this._updateRuleNodeReference(i.value);
            const e = this.getDataNode();
            let s;
            if (void 0 !== e && e.setValue(this.getDataNodeValue(this._jsonModel.value), this._jsonModel.value, this), this.parent.uniqueItems && "array" === this.parent.type && (r = t.uniqueItems(this.parent.uniqueItems, this.parent.getDataNode().$value)), i.valid && r.valid) s = this.evaluateConstraints();
            else {
                const e = {
                    valid: i.valid && r.valid,
                    errorMessage: i.valid && r.valid ? "" : this.getErrorMessage("type")
                };
                s = this._applyUpdates(["valid", "errorMessage"], e)
            }
            s.valid && this.triggerValidationEvent(s);
            const l = new qt({
                changes: n.concat(Object.values(s))
            });
            this.dispatch(l)
        }
    }
    _updateRuleNodeReference(e) {
        var t;
        if (null != (t = this.type) && t.endsWith("[]"))
            if (null != e)
                for (e.forEach((e, t) => {
                        this._ruleNodeReference[t] = e
                    }); e.length !== this._ruleNodeReference.length;) this._ruleNodeReference.pop();
            else
                for (; 0 !== this._ruleNodeReference.length;) this._ruleNodeReference.pop()
    }
    getInternalType() {
        return this.type
    }
    valueOf() {
        const e = this[vi],
            t = void 0 === e ? this : e;
        return t.ruleEngine.trackDependency(t), t._jsonModel.value || null
    }
    toString() {
        var e;
        const t = this[vi];
        return (null == (e = (void 0 === t ? this : t)._jsonModel.value) ? void 0 : e.toString()) || ""
    }
    getErrorMessage(e) {
        var t;
        return (null == (t = this._jsonModel.constraintMessages) ? void 0 : t[e]) || ""
    }
    _getConstraintObject() {
        return Ui
    }
    isArrayType() {
        return !!this.type && this.type.indexOf("[]") > -1
    }
    checkEnum(e, t) {
        if (!0 === this._jsonModel.enforceEnum && null != e) {
            const i = t.enum;
            return e instanceof Array && this.isArrayType() ? e.every(e => i(this.enum || [], e).valid) : i(this.enum || [], e).valid
        }
        return !0
    }
    checkStep() {
        return "number" != typeof this._jsonModel.step || (this._jsonModel.value - (this._jsonModel.minimum || this._jsonModel.default || 0)) % this._jsonModel.step == 0
    }
    checkValidationExpression() {
        return "string" != typeof this._jsonModel.validationExpression || this.executeExpression(this._jsonModel.validationExpression)
    }
    getConstraints() {
        switch (this.type) {
            case "string":
                switch (this.format) {
                    case "date":
                        return Ki.date;
                    case "binary":
                    case "data-url":
                        return Ki.file;
                    default:
                        return Ki.string
                }
            case "file":
                return Ki.file;
            case "number":
            case "integer":
                return Ki.number
        }
        return this.isArrayType() ? Ki.array : []
    }
    get format() {
        return this._jsonModel.format || ""
    }
    evaluateConstraints() {
        let e = "type";
        const t = this._jsonModel,
            i = this._jsonModel.value,
            n = this._getConstraintObject(),
            r = this.getConstraints();
        let s = !0;
        if (s && (s = n.required(this.required, i).valid && (!this.isArrayType() || !this.required || i.length > 0), e = "required"), s && i != this.emptyValue) {
            const l = r.find(e => {
                if (e in t) {
                    const r = t[e],
                        s = n[e];
                    return i instanceof Array && this.isArrayType() ? -1 !== Ki.array.indexOf(e) ? !s(r, i).valid : i.some(e => !s(r, e).valid) : "function" == typeof s && !s(r, i).valid
                }
                return !1
            });
            null != l ? (s = !1, e = l) : (s = this.checkEnum(i, n), e = "enum", s && "number" === this.type && (s = this.checkStep(), e = "step"), s && (s = this.checkValidationExpression(), e = "validationExpression"))
        }
        s || this.form.logger.log(`${e} constraint evaluation failed ${this[e]}. Received ${this._jsonModel.value}`);
        const l = {
            valid: s,
            errorMessage: s ? "" : this.getErrorMessage(e)
        };
        return this._applyUpdates(["valid", "errorMessage"], l)
    }
    triggerValidationEvent(e) {
        e.valid && this.dispatch(this.valid ? new Kt : new Vt)
    }
    validate() {
        const e = this.evaluateConstraints();
        return e.valid && (this.triggerValidationEvent(e), this.notifyDependents(new qt({
            changes: Object.values(e)
        }))), this.valid ? [] : [new Rt(this.id, [this._jsonModel.errorMessage])]
    }
    importData(e) {
        this._bindToDataModel(e);
        const t = this.getDataNode();
        if (void 0 !== t && t !== ri && t.$value !== this._jsonModel.value) {
            const e = Gt("value", t.$value, this._jsonModel.value);
            this._jsonModel.value = t.$value, this.queueEvent(e)
        }
    }
    defaultDataModel(e) {
        return new ii(e, this.getDataNodeValue(this._jsonModel.value), this.type || "string")
    }
    getState() {
        return Pt({}, super.getState(), {
            editValue: this.editValue,
            displayValue: this.displayValue
        })
    }
}

function Wi(e, t) {
    return e.replace(";base64", `;name=${encodeURIComponent(t)};base64`)
}
async function zi(e) {
    const {
        name: t,
        size: i,
        type: n
    } = e;
    return await new Promise((r, s) => {
        const l = new FileReader;
        l.onload = e => {
            r(new Mi({
                data: Wi(e.target.result, t),
                type: n,
                name: t,
                size: i
            }))
        }, l.readAsDataURL(e.data)
    })
}
Gi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Hi.prototype, "readOnly", null), Gi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Hi.prototype, "enabled", null), Gi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Hi.prototype, "valid", null), Gi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Hi.prototype, "enum", null), Gi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Hi.prototype, "enumNames", null), Gi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Hi.prototype, "required", null), Gi([function(e, t, i) {
    const n = i.get;
    null != n && (i.get = function() {
        return this.ruleEngine.trackDependency(this), n.call(this)
    })
}], Hi.prototype, "value", null);
class Qi extends Hi {
    _getDefaults() {
        return Pt({}, super._getDefaults(), {
            accept: ["audio/*", "video/*", "image/*", "text/*", "application/pdf"],
            maxFileSize: "2MB",
            type: "file"
        })
    }
    get maxFileSize() {
        return Pi(this._jsonModel.maxFileSize)
    }
    get accept() {
        return this._jsonModel.accept
    }
    _applyUpdates(e, t) {
        return e.reduce((e, i) => {
            const n = this._jsonModel[i],
                r = t[i];
            return r !== n && (e[i] = {
                propertyName: i,
                currentValue: r,
                prevValue: n
            }, this._jsonModel[i] = n instanceof Mi && "object" == typeof r && "value" === i ? new Mi(Pt({}, n, {
                data: r.data
            })) : r), e
        }, {})
    }
    getInternalType() {
        var e;
        return null != (e = this.type) && e.endsWith("[]") ? "file[]" : "file"
    }
    getDataNodeValue(e) {
        let t = e;
        var i;
        return null != t && ("string" === this.type ? t = null == (i = t.data) ? void 0 : i.toString() : "string[]" === this.type && (t = t instanceof Array ? t : [t], t = t.map(e => {
            var t;
            return null == e || null == (t = e.data) ? void 0 : t.toString()
        }))), t
    }
    async _serialize() {
        const e = this._jsonModel.value;
        return void 0 === e ? null : await (t = e instanceof Array ? e : [e], Promise.all([].map.call(t, zi)));
        var t
    }
    importData(e) {
        this._bindToDataModel(e);
        const t = this.getDataNode();
        if (void 0 !== t) {
            const e = null == t ? void 0 : t.$value;
            if (null != e) {
                const t = Ui.type(this.getInternalType(), e);
                t.valid || this.form.logger.error(`unable to bind ${this.name} to data`), this.form.getEventQueue().queue(this, Gt("value", t.value, this._jsonModel.value)), this._jsonModel.value = t.value
            } else this._jsonModel.value = null
        }
    }
}
class Ji extends Hi {
    offValue() {
        const e = this.enum;
        return e.length > 1 ? e[1] : null
    }
    _getConstraintObject() {
        const e = Pt({}, super._getConstraintObject());
        var t;
        return e.required = (t = this.offValue(), (e, i) => ({
            valid: Ui.required(e, i).valid && (!e || i != t),
            value: i
        })), e
    }
    _getDefaults() {
        return Pt({}, super._getDefaults(), {
            enforceEnum: !0
        })
    }
    get enum() {
        return this._jsonModel.enum || []
    }
}
class Xi extends Hi {
    constructor(e, t) {
        super(e, t)
    }
    _getFallbackType() {
        const e = super._getFallbackType();
        if ("string" == typeof e) return `${e}[]`
    }
    _getDefaults() {
        return Pt({}, super._getDefaults(), {
            enforceEnum: !0,
            enum: []
        })
    }
}
class Zi extends Hi {
    _applyDefaults() {
        super._applyDefaults();
        const e = (new Intl.DateTimeFormat).resolvedOptions().locale;
        this._jsonModel.editFormat || (this._jsonModel.editFormat = "short"), this._jsonModel.displayFormat || (this._jsonModel.displayFormat = this._jsonModel.editFormat), this._jsonModel.placeholder || (this._jsonModel.placeholder = getSkeleton(this._jsonModel.editFormat, e)), this._jsonModel.description || (this._jsonModel.description = `To enter today's date use ${formatDate(new Date, e, this._jsonModel.editFormat)}`)
    }
}
const en = (e, t) => {
        let i;
        var n;
        return i = "items" in e ? new nn(e, t) : Lt(e) || "file-input" === e.fieldType ? new Qi(e, t) : "checkbox" === ((null == (n = e) ? void 0 : n.fieldType) || Ct(n)) ? new Ji(e, t) : function(e) {
            return "checkbox-group" === ((null == e ? void 0 : e.fieldType) || Ct(e))
        }(e) ? new Xi(e, t) : function(e) {
            const t = (null == e ? void 0 : e.fieldType) || Ct(e);
            return "text-input" === t && "date" === (null == e ? void 0 : e.format) || "date-input" === t
        }(e) ? new Zi(e, t) : new Hi(e, t), t.form.fieldAdded(i), i
    },
    tn = {
        visible: !0
    };
class nn extends Oi {
    constructor(e, t) {
        super(e, t), this._applyDefaults(), this.queueEvent(new Ht), this.queueEvent(new Ut)
    }
    _applyDefaults() {
        Object.entries(tn).map(([e, t]) => {
            void 0 === this._jsonModel[e] && (this._jsonModel[e] = t)
        }), this._jsonModel.dataRef && void 0 === this._jsonModel.type && (this._jsonModel.type = "object")
    }
    get type() {
        const e = super.type;
        if ("array" === e || "object" === e) return e
    }
    _createChild(e, t) {
        const {
            parent: i = this
        } = t;
        return en(e, {
            form: this.form,
            parent: i
        })
    }
    get items() {
        return super.items
    }
    get value() {
        return null
    }
    get fieldType() {
        return "panel"
    }
    get enabled() {
        return this._jsonModel.enabled
    }
    set enabled(e) {
        this._setProperty("enabled", e)
    }
}
const rn = {
    off: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4
};
class sn {
    debug(e) {
        this.log(e, "debug")
    }
    info(e) {
        this.log(e, "info")
    }
    warn(e) {
        this.log(e, "warn")
    }
    error(e) {
        this.log(e, "error")
    }
    log(e, t) {
        0 !== this.logLevel && this.logLevel <= rn[t] && console[t](e)
    }
    constructor(e = "off") {
        this.logLevel = rn[e]
    }
}
class ln {
    constructor(e, t) {
        this._node = e, this._event = t
    }
    get node() {
        return this._node
    }
    get event() {
        return this._event
    }
    isEqual(e) {
        return null != e && this._node == e._node && this._event.type == e._event.type
    }
    toString() {
        return this._node.id + "__" + this.event.type
    }
    valueOf() {
        return this.toString()
    }
}
class on {
    constructor(e = new sn("off")) {
        this._isProcessing = !1, this._pendingEvents = [], this.logger = e, this._runningEventCount = {}
    }
    get length() {
        return this._pendingEvents.length
    }
    get isProcessing() {
        return this._isProcessing
    }
    isQueued(e, t) {
        const i = new ln(e, t);
        return void 0 !== this._pendingEvents.find(e => i.isEqual(e))
    }
    queue(e, t, i = !1) {
        e && t && (t instanceof Array || (t = [t]), t.forEach(t => {
            const n = new ln(e, t),
                r = this._runningEventCount[n.valueOf()] || 0;
            r < on.MAX_EVENT_CYCLE_COUNT ? (this.logger.info(`Queued event : ${t.type} node: ${e.id} - ${e.name}`), i ? this._pendingEvents.splice(this._isProcessing ? 1 : 0, 0, n) : this._pendingEvents.push(n), this._runningEventCount[n.valueOf()] = r + 1) : this.logger.info(`Skipped queueing event : ${t.type} node: ${e.id} - ${e.name} with count=${r}`)
        }))
    }
    runPendingQueue() {
        if (!this._isProcessing) {
            for (this._isProcessing = !0; this._pendingEvents.length > 0;) {
                const e = this._pendingEvents[0];
                this.logger.info(`Dequeued event : ${e.event.type} node: ${e.node.id} - ${e.node.name}`), e.node.executeAction(e.event), this._pendingEvents.shift()
            }
            this._runningEventCount = {}, this._isProcessing = !1
        }
    }
}
on.MAX_EVENT_CYCLE_COUNT = 10;
const an = {
        method: "GET"
    },
    un = e => {
        const t = e;
        return t.length > 0 && t.startsWith("custom:") ? t.substring("custom:".length) : t
    },
    cn = async(e, t, i, n, r, s, l) => {
        const o = t,
            a = {
                method: i
            };
        let u, c;
        try {
            if (n && n instanceof Mi && n.data instanceof File) {
                const e = new FormData;
                e.append(n.name, n.data), c = e
            } else if (n instanceof FormData) c = n;
            else if (n && "object" == typeof n && Object.keys(n).length > 0) {
                var h;
                const e = Object.keys(l);
                a.headers = e.length > 0 ? Pt({}, l, -1 === e.indexOf("Content-Type") ? {
                    "Content-Type": "application/json"
                } : {}) : {
                    "Content-Type": "application/json"
                };
                const t = (null == a || null == (h = a.headers) ? void 0 : h["Content-Type"]) || "application/json";
                "application/json" === t ? c = JSON.stringify(n) : t.indexOf("multipart/form-data") > -1 ? c = dn(n) : t.indexOf("application/x-www-form-urlencoded") > -1 && (c = hn(n))
            }
            u = await ((e, t = null, i = {}) => {
                const n = Pt({}, an, i);
                return fetch(e, Pt({}, n, {
                    body: t
                })).then(e => {
                    var t;
                    if (!e.ok) throw new Error(e.statusText);
                    return null != e && null != (t = e.headers.get("Content-Type")) && t.includes("application/json") ? e.json() : e.text()
                })
            })(o, c, a)
        } catch (t) {
            e.form.logger.error("Error invoking a rest API");
            const i = un(s);
            return void e.form.dispatch(new Zt(i, {}, !0))
        }
        const d = un(r);
        e.form.dispatch(new Zt(d, u, !0))
    },
    hn = e => {
        const t = new URLSearchParams;
        return Object.entries(e).forEach(([e, i]) => {
            t.append(e, null != i && "object" == typeof i ? Yt(i) : i)
        }), t
    },
    dn = (e, t) => {
        const i = new FormData;
        Object.entries(e).forEach(([e, t]) => {
            i.append(e, null != t && "object" == typeof t ? Yt(t) : t)
        });
        const n = (e, t) => {
            if ((null == e ? void 0 : e.data) instanceof File) {
                let i = `${null == e ? void 0 : e.dataRef}/${null == e ? void 0 : e.name}`;
                i.startsWith("/") || (i = `/${i}`), t.append(i, e.data)
            }
        };
        return t && Object.keys(t).reduce((e, r) => {
            const s = t[r];
            return s && s instanceof Array ? [...e, ...s.map(e => n(e, i))] : [...e, n(s, i)]
        }, []), i
    },
    pn = new class {
        constructor() {
            this.customFunctions = {}
        }
        registerFunctions(e) {
            Object.entries(e).forEach(([e, t]) => {
                let i = t;
                "function" == typeof t && (i = {
                    _func: e => t(...e),
                    _signature: []
                }), i.hasOwnProperty("_func") ? this.customFunctions[e] = i : console.warn(`Unable to register function with name ${e}.`)
            })
        }
        unregisterFunctions(...e) {
            e.forEach(e => {
                e in this.customFunctions && delete this.customFunctions[e]
            })
        }
        getFunctions() {
            function e(t) {
                return null == t ? t : null !== (i = t) && "[object Array]" === Object.prototype.toString.call(i) ? t.map(t => e(t)) : t.valueOf();
                var i
            }

            function t(e) {
                return null == e ? "" : e.toString()
            }
            return Pt({}, {
                validate: {
                    _func: (e, t, i) => {
                        const n = e[0];
                        let r;
                        return r = "string" == typeof n || void 0 === n ? i.globals.form.validate() : i.globals.form.getElement(n.$id).validate(), Array.isArray(r) && r.length && i.globals.form.logger.error("Form Validation Error"), r
                    },
                    _signature: []
                },
                setFocus: {
                    _func: (e, t, i) => {
                        const n = e[0];
                        try {
                            const e = i.globals.form.getElement(n.$id);
                            i.globals.form.setFocus(e)
                        } catch (e) {
                            i.globals.form.logger.error("Invalid argument passed in setFocus. An element is expected")
                        }
                    },
                    _signature: []
                },
                getData: {
                    _func: (e, t, i) => (i.globals.form.logger.warn("The `getData` function is depricated. Use `exportData` instead."), i.globals.form.exportData()),
                    _signature: []
                },
                exportData: {
                    _func: (e, t, i) => i.globals.form.exportData(),
                    _signature: []
                },
                importData: {
                    _func: (e, t, i) => {
                        const n = e[0];
                        return "object" == typeof n && null !== n && i.globals.form.importData(n), {}
                    },
                    _signature: []
                },
                submitForm: {
                    _func: (i, n, r) => {
                        const s = t(i[0]),
                            l = t(i[1]),
                            o = i.length > 2 ? t(i[2]) : "application/json",
                            a = i.length > 3 ? e(i[3]) : null;
                        return r.globals.form.dispatch(new Jt({
                            success: s,
                            error: l,
                            submit_as: o,
                            data: a
                        })), {}
                    },
                    _signature: []
                },
                request: {
                    _func: (i, n, r) => {
                        const s = t(i[0]),
                            l = t(i[1]),
                            o = e(i[2]);
                        let a, u, c = {};
                        return "string" == typeof i[3] ? (r.globals.form.logger.warn("This usage of request is deprecated. Please see the documentation and update"), a = e(i[3]), u = e(i[4])) : (c = e(i[3]), a = e(i[4]), u = e(i[5])), cn(r.globals, s, l, o, a, u, c), {}
                    },
                    _signature: []
                },
                dispatchEvent: {
                    _func: (t, i, n) => {
                        const r = t[0];
                        let s, l = e(t[1]),
                            o = t.length > 2 ? e(t[2]) : void 0,
                            a = !1;
                        return "string" == typeof r && (o = l, l = r, a = !0), s = l.startsWith("custom:") ? new Zt(l.substring("custom:".length), o, a) : ((e, t = {}) => {
                            switch (e) {
                                case "change":
                                    return new qt(t);
                                case "submit":
                                    return new Jt(t);
                                case "click":
                                    return new zt(t);
                                case "addItem":
                                    return new ei(t);
                                case "removeItem":
                                    return new ti(t);
                                default:
                                    console.error("invalid action")
                            }
                        })(l, o), null != s && ("string" == typeof r ? n.globals.form.dispatch(s) : n.globals.form.getElement(r.$id).dispatch(s)), {}
                    },
                    _signature: []
                }
            }, this.customFunctions)
        }
    };
class mn extends Oi {
    constructor(e, t, i = new on, n = "off") {
        super(e, {}), this._fields = {}, this._invalidFields = [], this.dataRefRegex = /("[^"]+?"|[^.]+?)(?:\.|$)/g, this._ruleEngine = t, this._eventQueue = i, this._logger = new sn(n), this.queueEvent(new Ht), this.queueEvent(new Ut), this._ids = function*(e = 50) {
            const t = function() {
                    const t = [];
                    for (let i = 0; i < e; i++) t.push(ji(10));
                    return t
                },
                i = {};
            let n = t();
            do {
                let e = n.pop();
                for (; e in i;) 0 === n.length && (n = t()), e = n.pop();
                i[e] = !0, yield n.pop(), 0 === n.length && (n = t())
            } while (n.length > 0)
        }(), this._bindToDataModel(new si("$form", {})), this._initialize(), this.queueEvent(new Wt)
    }
    get logger() {
        return this._logger
    }
    get metaData() {
        return new Ni(this._jsonModel.metadata || {})
    }
    get action() {
        return this._jsonModel.action
    }
    _createChild(e) {
        return en(e, {
            form: this,
            parent: this
        })
    }
    importData(e) {
        this._bindToDataModel(new si("$form", e)), this.syncDataAndFormModel(this.getDataNode()), this._eventQueue.runPendingQueue()
    }
    exportData() {
        var e;
        return null == (e = this.getDataNode()) ? void 0 : e.$value
    }
    setFocus(e) {
        const t = e.parent,
            i = e;
        for (; null != t && t.activeChild != i;) t.activeChild = i
    }
    getState() {
        const e = this,
            t = super.getState();
        return t.id = "$form", Object.defineProperty(t, "data", {
            get: function() {
                return e.exportData()
            }
        }), Object.defineProperty(t, "attachments", {
            get: function() {
                return ki(e)
            }
        }), t
    }
    get type() {
        return "object"
    }
    isTransparent() {
        return !1
    }
    get form() {
        return this
    }
    get ruleEngine() {
        return this._ruleEngine
    }
    getUniqueId() {
        return null == this._ids ? "" : this._ids.next().value
    }
    fieldAdded(e) {
        this._fields[e.id] = e, e.subscribe(e => {
            -1 === this._invalidFields.indexOf(e.target.id) && this._invalidFields.push(e.target.id)
        }, "invalid"), e.subscribe(e => {
            const t = this._invalidFields.indexOf(e.target.id);
            t > -1 && this._invalidFields.splice(t, 1)
        }, "valid"), e.subscribe(e => {
            const t = e.target.getState();
            if (t) {
                const i = new Xt(e.payload.changes, t);
                this.dispatch(i)
            }
        })
    }
    validate() {
        const e = super.validate();
        return this.dispatch(new Qt(e)), e
    }
    isValid() {
        return 0 === this._invalidFields.length
    }
    dispatch(e) {
        "submit" === e.type ? (super.queueEvent(e), this._eventQueue.runPendingQueue()) : super.dispatch(e)
    }
    executeAction(e) {
        "submit" === e.type && 0 !== this._invalidFields.length || super.executeAction(e)
    }
    submit(e, t) {
        if (0 === this.validate().length) {
            const i = (null == e ? void 0 : e.payload) || {};
            (async(e, t, i, n = "application/json", r = null) => {
                const s = e.form.action;
                let l = r;
                "object" == typeof l && null != l || (l = e.form.exportData());
                const o = ki(e.form);
                let a, u = n;
                Object.keys(o).length > 0 || "multipart/form-data" === n ? (a = dn({
                    data: l
                }, o), u = "multipart/form-data") : a = {
                    data: l
                }, await cn(e, s, "POST", a, t, i, {
                    "Content-Type": u
                })
            })(t, null == i ? void 0 : i.success, null == i ? void 0 : i.error, null == i ? void 0 : i.submit_as, null == i ? void 0 : i.data)
        }
    }
    getElement(e) {
        return e == this.id ? this : this._fields[e]
    }
    get qualifiedName() {
        return "$form"
    }
    getEventQueue() {
        return this._eventQueue
    }
    get name() {
        return "$form"
    }
    get value() {
        return null
    }
    get id() {
        return "$form"
    }
    get title() {
        return this._jsonModel.title || ""
    }
}
class _n {
    constructor() {
        this._globalNames = ["$form", "$field", "$event"]
    }
    compileRule(e) {
        const t = pn.getFunctions();
        return new kt(e, t, void 0, this._globalNames)
    }
    execute(e, t, i, n = !1) {
        const r = this._context;
        let s;
        this._context = i;
        try {
            e.debug = [], s = e.search(t, i)
        } catch (e) {
            var l, o, a;
            null == (l = this._context) || null == (o = l.form) || null == (a = o.logger) || a.error(e)
        }
        for (const t of e.debug) {
            var u, c, h;
            null == (u = this._context) || null == (c = u.form) || null == (h = c.logger) || h.debug(t)
        }
        let d = s;
        return n && "object" == typeof s && null !== s && (d = Object.getPrototypeOf(s).valueOf.call(s)), this._context = r, d
    }
    trackDependency(e) {
        this._context && void 0 !== this._context.field && this._context.field !== e && e._addDependent(this._context.field)
    }
}
console.timeEnd("script af-core");
const gn = {
    Click: zt,
    Change: qt,
    Submit: Jt,
    Blur: class extends Ft {
        constructor(e, t = !1) {
            super(e, "blur", {
                dispatch: t
            })
        }
    },
    AddItem: ei,
    RemoveItem: ti
};
class fn extends s {
    getQuestionMarkDiv() {
        return null
    }
    getLabel() {
        return null
    }
    getWidget() {
        return this.element.querySelector(".cmp-button")
    }
    getDescription() {
        return null
    }
    getErrorDiv() {
        return null
    }
    getTooltipDiv() {
        return null
    }
    addListener() {
        var e;
        null == (e = this.getWidget()) || e.addEventListener("click", () => {
            this._model.dispatch(new gn.Click)
        })
    }
    getbemBlock() {
        return fn.bemBlock
    }
    getIS() {
        return fn.IS
    }
    createView() {
        let e = document.createElement("button");
        e.type = "button", e.id = this.getId(), e.className = "cmp-button", e.title = this.getTooltipValue(), e.dataset.cmpVisible = this.isVisible().toString(), e.dataset.cmpEnabled = this.isEnabled().toString(), e.dataset.cmpAdaptiveformcontainerPath = this.getFormContainerPath(), e.dataset.cmpIs = "adaptiveFormButton", e.setAttribute("aria-label", this.getLabelValue());
        let t = document.createElement("span");
        return t.className = "cmp-button__text", t.textContent = this.getLabelValue(), e.appendChild(t), e
    }
}
fn.NS = "cmp", fn.IS = "adaptiveFormButton", fn.bemBlock = "cmp-adaptiveform-button", fn.selectors = {
    self: "[data-" + fn.NS + '-is="' + fn.IS + '"]'
};
var vn = /*#__PURE__*/ i("widget"),
    yn = /*#__PURE__*/ i("model"),
    bn = /*#__PURE__*/ i("options"),
    En = /*#__PURE__*/ i("defaultOptions"),
    Tn = /*#__PURE__*/ i("matchArray"),
    On = /*#__PURE__*/ i("regex"),
    wn = /*#__PURE__*/ i("processedValue"),
    Nn = /*#__PURE__*/ i("engRegex"),
    Mn = /*#__PURE__*/ i("writtenInLocale"),
    xn = /*#__PURE__*/ i("previousCompositionVal"),
    Dn = /*#__PURE__*/ i("toLatinForm"),
    jn = /*#__PURE__*/ i("attachEventHandlers"),
    kn = /*#__PURE__*/ i("attachCompositionEventHandlers"),
    Pn = /*#__PURE__*/ i("getDigits"),
    Rn = /*#__PURE__*/ i("escape"),
    Sn = /*#__PURE__*/ i("compositionUpdateCallback"),
    An = /*#__PURE__*/ i("handleKeyInput"),
    In = /*#__PURE__*/ i("handleKeyDown"),
    $n = /*#__PURE__*/ i("isValidChar"),
    Cn = /*#__PURE__*/ i("handleKeyPress"),
    Ln = /*#__PURE__*/ i("handlePaste"),
    Bn = /*#__PURE__*/ i("handleCut"),
    Yn = /*#__PURE__*/ i("convertValueToLocale"),
    Fn = /*#__PURE__*/ i("convertValueFromLocale"),
    qn = /*#__PURE__*/ i("isValueSame");
class Vn {
    constructor(e, t) {
        if (Object.defineProperty(this, qn, {
                value: rr
            }), Object.defineProperty(this, Fn, {
                value: nr
            }), Object.defineProperty(this, Yn, {
                value: ir
            }), Object.defineProperty(this, Bn, {
                value: tr
            }), Object.defineProperty(this, Ln, {
                value: er
            }), Object.defineProperty(this, Cn, {
                value: Zn
            }), Object.defineProperty(this, $n, {
                value: Xn
            }), Object.defineProperty(this, In, {
                value: Jn
            }), Object.defineProperty(this, An, {
                value: Qn
            }), Object.defineProperty(this, Sn, {
                value: zn
            }), Object.defineProperty(this, Rn, {
                value: Wn
            }), Object.defineProperty(this, Pn, {
                value: Hn
            }), Object.defineProperty(this, kn, {
                value: Gn
            }), Object.defineProperty(this, jn, {
                value: Un
            }), Object.defineProperty(this, Dn, {
                value: Kn
            }), Object.defineProperty(this, vn, {
                writable: !0,
                value: null
            }), Object.defineProperty(this, yn, {
                writable: !0,
                value: null
            }), Object.defineProperty(this, bn, {
                writable: !0,
                value: null
            }), Object.defineProperty(this, En, {
                writable: !0,
                value: {
                    value: null,
                    curValue: null,
                    pos: 0,
                    lengthLimitVisible: !0,
                    zero: "0",
                    decimal: ".",
                    minus: "-"
                }
            }), Object.defineProperty(this, Tn, {
                writable: !0,
                value: {
                    integer: "^[+-]?{digits}*$",
                    decimal: "^[+-]?{digits}{leading}({decimal}{digits}{fraction})?$",
                    float: "^[+-]?{digits}*({decimal}{digits}*)?$"
                }
            }), Object.defineProperty(this, On, {
                writable: !0,
                value: null
            }), Object.defineProperty(this, wn, {
                writable: !0,
                value: null
            }), Object.defineProperty(this, Nn, {
                writable: !0,
                value: null
            }), Object.defineProperty(this, Mn, {
                writable: !0,
                value: !1
            }), Object.defineProperty(this, xn, {
                writable: !0,
                value: ""
            }), n(this, vn)[vn] = e, n(this, yn)[yn] = t, n(this, bn)[bn] = Object.assign({}, n(this, En)[En], n(this, yn)[yn]._jsonModel), n(this, Tn)[Tn][n(this, bn)[bn].dataType]) {
            let e = n(this, bn)[bn].leadDigits,
                t = n(this, bn)[bn].fracDigits,
                i = t && -1 !== t ? "{0," + t + "}" : "*",
                r = r.replace("{leading}", e && -1 !== e ? "{0," + e + "}" : "*").replace("{fraction}", i),
                s = r.replace(/{digits}/g, n(this, Pn)[Pn]()).replace("{decimal}", n(this, Rn)[Rn](n(this, bn)[bn].decimal)),
                l = r.replace(/{digits}/g, "[0-9]").replace("{decimal}", "\\.");
            n(this, wn)[wn] = !("[0123456789]" === n(this, Pn)[Pn]() && "." === n(this, bn)[bn].decimal), n(this, On)[On] = new RegExp(s, "g"), n(this, Nn)[Nn] = new RegExp(l, "g")
        }
        n(this, vn)[vn].setAttribute("type", "text"), n(this, jn)[jn](e)
    }
    getValue(e) {
        return (e = n(this, Dn)[Dn](e)).length > 0 && n(this, wn)[wn] && !e.match(n(this, Nn)[Nn]) ? (n(this, Mn)[Mn] = !0, e = n(this, Fn)[Fn](e)) : n(this, Mn)[Mn] = !1, e && e.length >= n(this, bn)[bn].combCells && (e = e.slice(0, n(this, bn)[bn].combCells)), n(this, xn)[xn] = e, e
    }
    trigger(e, t) {
        if (!n(this, vn)[vn]) return this;
        const i = e.split(".")[0];
        if (void 0 !== document.body[`on${i}`]) return n(this, vn)[vn].dispatchEvent(new Event(i)), this;
        const r = new CustomEvent(i, {
            detail: t || null
        });
        return n(this, vn)[vn].dispatchEvent(r), this
    }
    getHTMLSupportedAttr(e, t) {
        try {
            return e[t]
        } catch (e) {
            return
        }
    }
    isNonPrintableKey(e) {
        return e && !["MozPrintableKey", "Divide", "Multiply", "Subtract", "Add", "Enter", "Decimal", "Spacebar", "Del"].includes(e) && 1 !== e.length
    }
    setValue(e) {
        n(this, qn)[qn]() || (e && n(this, Mn)[Mn] ? n(this, vn)[vn].value = n(this, Yn)[Yn](e) : n(this, vn)[vn].value = n(this, yn)[yn].value)
    }
}

function Kn(e) {
    return e.replace(/[\uff00-\uffef]/g, function(e) {
        return String.fromCharCode(e.charCodeAt(0) - 65248)
    })
}

function Un(e, t) {
    e.addEventListener("keydown", e => {
        n(this, In)[In](e)
    }), e.addEventListener("keypress", e => {
        n(this, Cn)[Cn](e)
    }), e.addEventListener("paste", e => {
        n(this, Ln)[Ln](e)
    }), e.addEventListener("cut", e => {
        n(this, Bn)[Bn](e)
    }), e.addEventListener("blur", e => {
        n(this, yn)[yn].value = this.getValue(e.target.value)
    }), n(this, kn)[kn](e)
}

function Gn(e) {
    let t = !1,
        i = this,
        r = function() {
            let t = window.getSelection();
            t.selectAllChildren(e), t.collapseToEnd()
        };
    e.addEventListener("keyup", function(e) {
        t && (n(i, Sn)[Sn](e) && r(), t = !1)
    }), e.addEventListener("compositionstart", function(e) {}), e.addEventListener("compositionupdate", function(e) {
        n(i, Sn)[Sn](e) && r()
    }), e.addEventListener("compositionend", function(e) {
        t = !0
    }), e.addEventListener("keydown", function(e) {
        229 !== e.which && (t = !1)
    })
}

function Hn() {
    let e = n(this, bn)[bn].zero.charCodeAt(0),
        t = "";
    for (let i = 0; i < 10; i++) t += String.fromCharCode(e + i);
    return "[" + t + "]"
}

function Wn(e) {
    return e.replace(".", "\\.")
}

function zn(e) {
    let t = this,
        i = !1,
        r = n(t, bn)[bn].leadDigits,
        s = n(t, bn)[bn].fracDigits;
    if (-1 !== r) {
        let l = n(this, vn)[vn].value;
        "compositionupdate" === e.type && e.originalEvent.data && (l += e.originalEvent.data.substr(e.originalEvent.data.length - 1));
        let o = r + (-1 !== s ? s + n(t, bn)[bn].decimal.length : 0); - 1 === l.indexOf(n(t, bn)[bn].decimal) && (o = r);
        let a = n(this, Dn)[Dn](l),
            u = a.match(n(t, On)[On]) || a.match(n(this, Nn)[Nn]);
        if (i = !u, null === u) n(t, vn)[vn].value = n(t, xn)[xn], i = !0;
        else if (i) {
            let e = l.substr(0, o);
            n(t, vn)[vn].value = e, n(t, xn)[xn] = e, i = !0
        } else n(t, xn)[xn] = l
    }
    return i
}

function Qn(e, t, i) {
    if (e.ctrlKey && !["paste", "cut"].includes(e.type)) return !0;
    n(this, In)[In](arguments), n(this, bn)[bn].lengthLimitVisible = !0;
    let r, s = n(this, vn)[vn].value,
        l = this.getHTMLSupportedAttr(n(this, vn)[vn], "selectionStart") || 0,
        o = !(null == l),
        a = this.getHTMLSupportedAttr(n(this, vn)[vn], "selectionEnd") || 0,
        u = parseInt(n(this, bn)[bn].combCells) || 0,
        c = t;
    if (u > 0 && (c = t.substr(0, u - s.length + a - l)), !o) return !0;
    r = s.substr(0, l) + c + s.substr(a);
    let h = n(this, Dn)[Dn](r);
    return null == n(this, On)[On] || h.match(n(this, On)[On]) || h.match(n(this, Nn)[Nn]) ? !["keydown", "cut"].includes(e.type) && u && (s.length >= u || r.length > u) && l === a ? (e.preventDefault(), !1) : (n(this, bn)[bn].curValue = s, n(this, xn)[xn] = s, void(n(this, bn)[bn].pos = l)) : (e.preventDefault(), !1)
}

function Jn(e) {
    if (e) {
        let t = e.charCode || e.which || e.keyCode || 0;
        if (8 === t || 46 === t) n(this, An)[An](e, "", t);
        else if (32 === t) return e.preventDefault(), !1
    }
}

function Xn(e) {
    e = n(this, Dn)[Dn](e);
    let t = String.fromCharCode(n(this, bn)[bn].zero.charCodeAt(0) + 9);
    return e >= "0" && e <= "9" || e >= n(this, bn)[bn].zero && e <= t || e === n(this, bn)[bn].decimal || e === n(this, bn)[bn].minus
}

function Zn(e) {
    if (e) {
        let t = e.charCode || e.which || e.keyCode || 0,
            i = String.fromCharCode(t);
        if (this.isNonPrintableKey(e.key)) return !0;
        if (n(this, $n)[$n](i)) n(this, An)[An](e, i, t);
        else if (!e.ctrlKey) return e.preventDefault(), !1
    }
}

function er(e) {
    if (e) {
        let t;
        if (window.clipboardData && window.clipboardData.getData ? t = window.clipboardData.getData("Text") : (e.originalEvent || e).clipboardData && (e.originalEvent || e).clipboardData.getData && (t = (e.originalEvent || e).clipboardData.getData("text/plain")), t)
            if (t.split("").every(function(e) {
                    return n(this, $n)[$n](e)
                }, this)) t = n(this, Dn)[Dn](t), n(this, An)[An](e, t, 0);
            else if (!e.ctrlKey) return e.preventDefault(), !1
    }
}

function tr(e) {
    e && n(this, An)[An](e, "", 0)
}

function ir(e) {
    let t = n(this, bn)[bn].zero.charCodeAt(0);
    return e.map(function(e) {
        return "." === e ? n(this, bn)[bn].decimal : "-" === e ? n(this, bn)[bn].minus : String.fromCharCode(parseInt(e) + t)
    }, this).join("")
}

function nr(e) {
    e = n(this, Dn)[Dn](e);
    let t = n(this, bn)[bn].zero.charCodeAt(0);
    return e.map(function(e) {
        return e === n(this, bn)[bn].decimal ? "." : e === n(this, bn)[bn].minus ? "-" : (e.charCodeAt(0) - t).toString()
    }, this).join("")
}

function rr() {
    return null === n(this, yn)[yn].value && "" === n(this, vn)[vn].value || n(this, yn)[yn].value === n(this, vn)[vn].value
}
class sr extends s {
    constructor(...e) {
        super(...e), this.widgetObject = void 0
    }
    getClass() {
        return sr.IS
    }
    getWidget() {
        return this.element.querySelector(sr.selectors.widget)
    }
    getDescription() {
        return this.element.querySelector(sr.selectors.description)
    }
    getLabel() {
        return this.element.querySelector(sr.selectors.label)
    }
    getErrorDiv() {
        return this.element.querySelector(sr.selectors.errorDiv)
    }
    getTooltipDiv() {
        return this.element.querySelector(sr.selectors.tooltipDiv)
    }
    getQuestionMarkDiv() {
        return this.element.querySelector(sr.selectors.qm)
    }
    _updateValue(e) {
        null == this.widgetObject && (this._model._jsonModel.editFormat || this._model._jsonModel.displayFormat) && (this.widgetObject = new Vn(this.getWidget(), this._model)), this.widgetObject ? this.widgetObject.setValue(e) : super._updateValue(e)
    }
    addListener() {
        var e, t, i, n, r;
        null != (e = this._model) && null != (t = e._jsonModel) && t.editFormat || null != (i = this._model) && null != (n = i._jsonModel) && n.displayFormat ? null == this.widgetObject && (this.widgetObject = new Vn(this.getWidget(), this._model)) : null == (r = this.getWidget()) || r.addEventListener("blur", e => {
            this._model.value = e.target.value
        })
    }
    getbemBlock() {
        return sr.bemBlock
    }
    getIS() {
        return sr.IS
    }
    createInputHTML() {
        let e = document.createElement("input");
        return e.className = "cmp-adaptiveform-numberinput__widget", e.title = this.isTooltipVisible() ? this.getTooltipValue() : "", e.type = "number", e.name = this.getName(), e.value = this.getDefault(), e.placeholder = this.getPlaceHolder(), e.required = this.isRequired(), e.setAttribute("aria-label", this.isLabelVisible() ? this.getLabelValue() : ""), this.setDisabledAttribute(e), this.setReadonlyAttribute(e), this.setNumberConstraints(e), e
    }
}
sr.NS = "cmp", sr.IS = "adaptiveFormNumberInput", sr.bemBlock = "cmp-adaptiveform-numberinput", sr.selectors = {
    self: "[data-" + sr.NS + '-is="' + sr.IS + '"]',
    widget: `.${sr.bemBlock}__widget`,
    label: `.${sr.bemBlock}__label`,
    description: `.${sr.bemBlock}__longdescription`,
    errorDiv: `.${sr.bemBlock}__errormessage`,
    qm: `.${sr.bemBlock}__questionmark`,
    tooltipDiv: `.${sr.bemBlock}__shortdescription`
};
class lr extends s {
    constructor(e, t) {
        super(e, t), this.qm = this.element.querySelector(lr.selectors.qm)
    }
    getWidget() {
        return this.element.querySelector(lr.selectors.widget)
    }
    getWidgets() {
        return this.element.querySelectorAll(lr.selectors.widget)
    }
    getDescription() {
        return this.element.querySelector(lr.selectors.description)
    }
    getLabel() {
        return this.element.querySelector(lr.selectors.label)
    }
    getQuestionMarkDiv() {
        return this.element.querySelector(lr.selectors.qm)
    }
    getTooltipDiv() {
        return this.element.querySelector(lr.selectors.tooltipDiv)
    }
    getErrorDiv() {
        return this.element.querySelector(lr.selectors.errorDiv)
    }
    _updateValue(e) {
        null != e && this.getWidgets().forEach(t => {
            null != t.value && e.toString() == t.value.toString() ? (t.checked = !0, t.setAttribute("checked", "checked"), t.setAttribute("aria-checked", !0 + "")) : (t.checked = !1, t.removeAttribute("checked"), t.setAttribute("aria-checked", !1 + ""))
        }, this)
    }
    _updateEnabled(e) {
        this.toggle(e, "aria-disabled", !0), this.element.setAttribute("data-cmp-enabled", e + "");
        let t = this.getWidgets();
        null == t || t.forEach(t => {
            !1 === e ? (t.setAttribute("disabled", !0 + ""), t.setAttribute("aria-disabled", !0 + "")) : (t.removeAttribute("disabled"), t.removeAttribute("aria-disabled"))
        })
    }
    addListener() {
        this.getWidgets().forEach(e => {
            e.addEventListener("change", e => {
                this._model.value = e.target.value
            })
        })
    }
    getbemBlock() {
        return lr.bemBlock
    }
    getIS() {
        return lr.IS
    }
    createInputHTML() {
        var e, t;
        let i = [];
        return null == (e = this.state) || null == (t = e.enum) || t.forEach((e, t) => {
            var n, r;
            i.push(this.createRadioButton(this, e, null == (n = this.state) || null == (r = n.enumNames) ? void 0 : r[t], t))
        }), i
    }
    createRadioButton(e, t, i, n) {
        let r = document.createElement("div");
        r.className = "cmp-adaptiveform-radiobutton__option " + e.getLayoutProperties().orientation;
        let s = document.createElement("label");
        s.className = "cmp-adaptiveform-radiobutton__option__label", s.title = e.getTooltipValue(), s.setAttribute("aria-label", i || t), s.setAttribute("aria-describedby", "_desc");
        let l = document.createElement("input");
        l.type = "radio", l.name = e.getName(), l.className = "cmp-adaptiveform-radiobutton__option__widget", l.id = e.getId() + "_" + n + "__widget", l.value = t || t, l.checked = t == this.getDefault(), l.setAttribute("aria-describedby", "_desc"), this.setDisabledAttribute(l);
        let o = document.createElement("span");
        return o.textContent = i || t, s.appendChild(l), s.appendChild(o), r.appendChild(s), r
    }
}
lr.NS = "cmp", lr.IS = "adaptiveFormRadioButton", lr.bemBlock = "cmp-adaptiveform-radiobutton", lr.selectors = {
    self: "[data-" + lr.NS + '-is="' + lr.IS + '"]',
    widget: `.${lr.bemBlock}__option__widget`,
    label: `.${lr.bemBlock}__label`,
    description: `.${lr.bemBlock}__longdescription`,
    qm: `.${lr.bemBlock}__questionmark`,
    errorDiv: `.${lr.bemBlock}__errormessage`,
    tooltipDiv: `.${lr.bemBlock}__shortdescription`
};
class or extends s {
    getWidget() {
        return null
    }
    getDescription() {
        return null
    }
    getLabel() {
        return null
    }
    getErrorDiv() {
        return null
    }
    getTooltipDiv() {
        return null
    }
    getQuestionMarkDiv() {
        return null
    }
    getClass() {
        return or.IS
    }
    setFocus() {
        this.setActive()
    }
    getbemBlock() {
        return or.bemBlock
    }
    getIS() {
        return or.IS
    }
    createView() {
        let e = document.createElement("div");
        e.id = this.getId(), e.className = this.getbemBlock(), e.dataset.cmpVisible = this.isVisible().toString(), e.dataset.cmpAdaptiveformcontainerPath = this.getFormContainerPath(), e.dataset.cmIs = this.getIS();
        let t = document.createElement("div");
        return t.className = this.getbemBlock() + "__widget", t.tabIndex = 0, t.textContent = this.state.value, e.append(t), e
    }
}
or.NS = "cmp", or.IS = "adaptiveFormText", or.bemBlock = "cmp-adaptiveform-text", or.selectors = {
    self: "[data-" + or.NS + '-is="' + or.IS + '"]'
};
class ar extends s {
    getWidget() {
        return this.element.querySelector(ar.selectors.widget)
    }
    getDescription() {
        return this.element.querySelector(ar.selectors.description)
    }
    getLabel() {
        return this.element.querySelector(ar.selectors.label)
    }
    getDisplayLabel() {
        return this.element.querySelector(ar.selectors.labelValue)
    }
    getErrorDiv() {
        return this.element.querySelector(ar.selectors.errorDiv)
    }
    getTooltipDiv() {
        return this.element.querySelector(ar.selectors.tooltipDiv)
    }
    getQuestionMarkDiv() {
        return this.element.querySelector(ar.selectors.qm)
    }
    addListener() {
        var e, t;
        null == (e = this.getWidget()) || e.addEventListener("change", e => {
            this._model.value = e.target.value, this.setInactive();
            let t = this.getDisplayLabel();
            t && (t.textContent = "\t\t\t" + e.target.value)
        }), null == (t = this.getWidget()) || t.addEventListener("focus", e => {
            this.setActive()
        })
    }
    getbemBlock() {
        return ar.bemBlock
    }
    getIS() {
        return ar.IS
    }
    createInputHTML() {
        let e = document.createElement("label");
        e.className = "cmp-adaptiveform-sliderinput__label__value", e.textContent = "\t\t\t" + this.getDefault();
        let t = document.createElement("input");
        return t.className = "cmp-adaptiveform-sliderinput__widget", t.title = this.isTooltipVisible() ? this.getTooltipValue() : "", t.type = "range", t.name = this.getName(), t.value = this.getDefault(), t.step = "" + this.state.step, t.placeholder = this.getPlaceHolder(), t.required = this.isRequired(), t.setAttribute("aria-label", this.isLabelVisible() ? this.getLabelValue() : ""), this.setDisabledAttribute(t), this.setReadonlyAttribute(t), this.setNumberConstraints(t), [e, t]
    }
}
ar.NS = "cmp", ar.IS = "adaptiveFormSliderInput", ar.bemBlock = "cmp-adaptiveform-sliderinput", ar.selectors = {
    self: "[data-" + ar.NS + '-is="' + ar.IS + '"]',
    widget: `.${ar.bemBlock}__widget`,
    label: `.${ar.bemBlock}__label`,
    labelValue: `.${ar.bemBlock}__label__value`,
    description: `.${ar.bemBlock}__longdescription`,
    qm: `.${ar.bemBlock}__questionmark`,
    errorDiv: `.${ar.bemBlock}__errormessage`,
    tooltipDiv: `.${ar.bemBlock}__shortdescription`
};
class ur extends l {
    createInputHTML() {
        let e = document.createElement("input");
        return e.className = "cmp-adaptiveform-textinput__widget", e.title = this.isTooltipVisible() ? this.getTooltipValue() : "", e.type = "email", e.name = this.getName(), e.value = this.getDefault(), e.placeholder = this.getPlaceHolder(), e.required = this.isRequired(), e.setAttribute("aria-label", this.isLabelVisible() ? this.getLabelValue() : ""), this.setDisabledAttribute(e), this.setReadonlyAttribute(e), this.setStringContraints(e), e
    }
}
class cr extends s {
    constructor(e, t) {
        super(e, t), this.widgetLabel = void 0, this.qm = this.element.querySelector(cr.selectors.qm), this.widgetLabel = this.element.querySelector(cr.selectors.widgetLabel)
    }
    getWidget() {
        return this.element.querySelector(cr.selectors.widget)
    }
    getWidgets() {
        return this.element.querySelectorAll(cr.selectors.widget)
    }
    getDescription() {
        return this.element.querySelector(cr.selectors.description)
    }
    getLabel() {
        return this.element.querySelector(cr.selectors.label)
    }
    getErrorDiv() {
        return this.element.querySelector(cr.selectors.errorDiv)
    }
    getQuestionMarkDiv() {
        return this.element.querySelector(cr.selectors.qm)
    }
    getTooltipDiv() {
        return this.element.querySelector(cr.selectors.tooltipDiv)
    }
    _updateModelValue() {
        let e = this.getWidgets();
        if (1 == e.length) this._model.value = e[0].checked;
        else {
            let t = [];
            null == e || e.forEach(e => {
                e.checked && t.push(e.value)
            }, this), this._model.value = t
        }
    }
    _updateValue(e) {
        1 == this.getWidgets().length ? super._updateValue(e) : null != e && this.getWidgets().forEach(t => {
            null != t.value && null != e && e.includes(t.value) ? (t.checked = !0, t.setAttribute("checked", "checked"), t.setAttribute("aria-checked", !0 + "")) : (t.checked = !1, t.removeAttribute("checked"), t.setAttribute("aria-checked", !1 + ""))
        }, this)
    }
    _updateEnabled(e) {
        this.toggle(e, "aria-disabled", !0), this.element.setAttribute("data-cmp-enabled", e + "");
        let t = this.getWidgets();
        null == t || t.forEach(t => {
            !1 === e ? (t.setAttribute("disabled", !0 + ""), t.setAttribute("aria-disabled", !0 + "")) : (t.removeAttribute("disabled"), t.removeAttribute("aria-disabled"))
        })
    }
    addListener() {
        this.getWidgets().forEach(e => {
            e.addEventListener("change", e => {
                this._updateModelValue()
            })
        })
    }
    getbemBlock() {
        return cr.bemBlock
    }
    getIS() {
        return cr.IS
    }
    createInputHTML() {
        var e, t;
        let i = document.createElement("div");
        return i.className = "cmp-adaptiveform-checkboxgroup__widget", null == (e = this.state) || null == (t = e.enum) || t.forEach((e, t, n) => {
            var r, s;
            i.appendChild(this.createCheckboxHTML(this, e, (null == (r = this.state) || null == (s = r.enumNames) ? void 0 : s[t]) || e, t, null == n ? void 0 : n.length))
        }), i
    }
    createCheckboxHTML(e, t, i, n, r) {
        var s, l;
        let o = document.createElement("div");
        o.className = "cmp-adaptiveform-checkboxgroup-item " + e.getName() + " " + e.getLayoutProperties().orientation;
        let a = document.createElement("label");
        a.className = "cmp-adaptiveform-checkbox__label", a.title = e.getTooltipValue(), a.htmlFor = e.id + "_" + n + "__widget", a.setAttribute("aria-label", i);
        let u = document.createElement("input");
        u.className = "cmp-adaptiveform-checkbox__widget", u.type = "checkbox", u.id = a.htmlFor, u.value = t.toString(), u.name = r > 1 ? e.getName() : e.getLabelValue(), u.checked = r > 1 ? null == (s = e.getDefault()) ? void 0 : s.includes(t) : t == e.getDefault(), u.setAttribute("aria-describedby", "_desc"), this.setDisabledAttribute(u);
        let c = document.createElement("span");
        var h, d;
        return null != (l = this.state) && l.enum && (c.textContent = (null == (h = this.state) || null == (d = h.enum) ? void 0 : d.length) > 1 ? i : e.getLabelValue()), a.appendChild(u), a.appendChild(c), o.appendChild(a), o
    }
    createLabel() {
        var e, t;
        let i = document.createElement("label");
        return i.id = this.getId() + "-label", i.htmlFor = this.getId(), i.className = this.getbemBlock() + "__label", i.textContent = this.getLabelValue(), i.hidden = this.isLabelVisible() && 1 == (null == (e = this.state) || null == (t = e.enum) ? void 0 : t.length), i
    }
}
cr.NS = "cmp", cr.IS = "adaptiveFormCheckBoxGroup", cr.bemBlock = "cmp-adaptiveform-checkboxgroup", cr.checkboxBemBlock = "cmp-adaptiveform-checkbox", cr.selectors = {
    self: "[data-" + cr.NS + '-is="' + cr.IS + '"]',
    widgets: `.${cr.bemBlock}__widgets`,
    widget: `.${cr.checkboxBemBlock}__widget`,
    widgetLabel: `.${cr.checkboxBemBlock}__label`,
    label: `.${cr.bemBlock}__label`,
    description: `.${cr.bemBlock}__longdescription`,
    qm: `.${cr.bemBlock}__questionmark`,
    errorDiv: `.${cr.bemBlock}__errormessage`,
    tooltipDiv: `.${cr.bemBlock}__shortdescription`
};
var hr = /*#__PURE__*/ i("element");
class dr {
    constructor(e) {
        var t = this;
        this._model = void 0, this._path = void 0, this._deferredParents = void 0, Object.defineProperty(this, hr, {
            writable: !0,
            value: void 0
        }), this.renderChildrens = (e, t) => {
            console.time("Rendering childrens");
            let i = null == t ? void 0 : t.items;
            i && i.length > 0 && i.forEach((t, i) => {
                e.append(this.getRender(t, i))
            }), console.timeEnd("Rendering childrens")
        }, this.getRender = (e, t) => {
            const i = document.createElement("div");
            try {
                let t, n = this.getModel(e.id),
                    r = {
                        element: i,
                        id: e.id
                    };
                switch (null == e ? void 0 : e.fieldType) {
                    case "checkbox":
                        t = new cr(r, n);
                        break;
                    case "email":
                        t = new ur(r, n);
                        break;
                    case "slider":
                        t = new ar(r, n);
                        break;
                    case "plain-text":
                        t = new or(r, n);
                        break;
                    case "radio":
                        t = new lr(r, n);
                        break;
                    case "number":
                        t = new sr(r, n);
                        break;
                    case "button":
                        t = new fn(r, n);
                        break;
                    case "select":
                        t = new u(r, n);
                        break;
                    case "text-area":
                        t = new o(r, n);
                        break;
                    default:
                        t = new l(r, n)
                }
                t && (t.render(), this.loadCustomComponent(n, t))
            } catch (e) {
                console.error("Unexpected error ", e)
            }
            return i
        }, this.loadCustomComponent = async function(e, i) {
            e && i && e[":type"] != e.fieldType && (i.elementWrapper.setAttribute("data-block-name", e[":type"]), t.loadBlock(i.elementWrapper, e, i))
        }, this.loadBlock = async function(e, i, n) {
            const r = e.getAttribute("data-block-status");
            if ("loading" !== r && "loaded" !== r) {
                e.setAttribute("data-block-status", "loading");
                const r = e.getAttribute("data-block-name");
                try {
                    const s = new Promise(e => {
                            t.loadCSS(`/blocks/${r}/${r}.css`, e)
                        }),
                        l = new Promise(t => {
                            !async function() {
                                try {
                                    const t = await
                                    import (`/blocks/${r}/${r}.js`);
                                    t.default && (n.customWidget = t.default, await t.default(e, i, i.getState()))
                                } catch (e) {
                                    console.log(`failed to load module for ${r}`, e)
                                }
                                t(!0)
                            }()
                        });
                    await Promise.all([s, l])
                } catch (e) {
                    console.log(`failed to load block ${r}`, e)
                }
                e.setAttribute("data-block-status", "loaded")
            }
        }, this._model = ((e, t, i = "error", n) => {
            try {
                let r = n;
                null == r && (r = new mn(Pt({}, e), new _n, new on(new sn(i)), i));
                const s = null == e ? void 0 : e.data;
                return s && r.importData(s), "function" == typeof t && t(r), r.getEventQueue().runPendingQueue(), r
            } catch (e) {
                throw console.error(`Unable to create an instance of the Form ${e}`), new Error(e)
            }
        })(null == e ? void 0 : e._formJson, null), this._path = e._path, this._deferredParents = {}
    }
    getModel(e) {
        var t;
        return null == (t = this._model) ? void 0 : t.getElement(e)
    }
    getPath() {
        return this._path
    }
    render(e) {
        var t;
        const i = document.createElement("form");
        i.className = "cmp-adaptiveform-container cmp-container", n(this, hr)[hr] = i;
        let r = null == (t = this._model) ? void 0 : t.getState();
        return this.renderChildrens(i, r), e.replaceWith(i), i
    }
    loadCSS(e, t) {
        if (document.querySelector(`head > link[href="${e}"]`)) "function" == typeof t && t("noop");
        else {
            const i = document.createElement("link");
            i.setAttribute("rel", "stylesheet"), i.setAttribute("href", e), "function" == typeof t && (i.onload = e => t(e.type), i.onerror = e => t(e)), document.head.appendChild(i)
        }
    }
}
var pr = /*#__PURE__*/ i("initFormDef"),
    mr = /*#__PURE__*/ i("initField"),
    _r = /*#__PURE__*/ i("handleProperites"),
    gr = /*#__PURE__*/ i("transformPropertyRules"),
    fr = /*#__PURE__*/ i("handleField"),
    vr = /*#__PURE__*/ i("transformFieldType"),
    yr = /*#__PURE__*/ i("transformFieldNames"),
    br = /*#__PURE__*/ i("transformFlatToHierarchy"),
    Er = /*#__PURE__*/ i("handleCheckbox"),
    Tr = /*#__PURE__*/ i("handleMultiValues"),
    Or = /*#__PURE__*/ i("handleFranklinSpecialCases"),
    wr = /*#__PURE__*/ i("isProperty");
class Nr {
    constructor() {
        Object.defineProperty(this, wr, {
            value: Cr
        }), Object.defineProperty(this, Or, {
            value: $r
        }), Object.defineProperty(this, Tr, {
            value: Ir
        }), Object.defineProperty(this, Er, {
            value: Ar
        }), Object.defineProperty(this, br, {
            value: Sr
        }), Object.defineProperty(this, yr, {
            value: Rr
        }), Object.defineProperty(this, vr, {
            value: Pr
        }), Object.defineProperty(this, fr, {
            value: kr
        }), Object.defineProperty(this, gr, {
            value: jr
        }), Object.defineProperty(this, _r, {
            value: Dr
        }), Object.defineProperty(this, mr, {
            value: xr
        }), Object.defineProperty(this, pr, {
            value: Mr
        }), this.fieldPropertyMapping = {
            Default: "default",
            MaxLength: "maxLength",
            MinLength: "minLength",
            Maximum: "maximum",
            Minimum: "minimum",
            Step: "step",
            Pattern: "pattern",
            Value: "value",
            Placeholder: "placeholder",
            Field: "name",
            ReadOnly: "readOnly",
            Description: "description",
            Type: "fieldType",
            Label: "label.value",
            Mandatory: "required",
            Options: "enum"
        }
    }
    async _getForm(e) {
        if (!e) throw new Error("formPath is required");
        const t = await fetch(e);
        return await t.json()
    }
    async getFormModel(e) {
        if (e) {
            console.time("Get Excel JSON");
            let t = await this._getForm(e);
            return console.timeEnd("Get Excel JSON"), this.transform(t, e)
        }
    }
    transform(t, i) {
        if (null != t && t.adaptiveform) return {
            formDef: t,
            excelData: null
        };
        if (!t || !t.data) throw new Error("Unable to retrieve the form details from " + i);
        const r = n(this, pr)[pr](i);
        let s = r;
        return t.data.forEach(t => {
            let i = Object.fromEntries(Object.entries(t).filter(([e, t]) => null != t && "" != t)),
                l = e({}, i, n(this, mr)[mr]());
            n(this, yr)[yr](l), n(this, wr)[wr](l) ? n(this, _r)[_r](r, l) : s.items.push(n(this, fr)[fr](l))
        }), n(this, gr)[gr](r), {
            formDef: r,
            excelData: t
        }
    }
}

function Mr(e) {
    return {
        adaptiveform: "0.10.0",
        metadata: {
            grammar: "json-formula-1.0.0",
            version: "1.0.0"
        },
        properties: {},
        rules: {},
        items: [],
        action: null == e ? void 0 : e.split(".json")[0]
    }
}

function xr() {
    return {
        constraintMessages: {
            required: "Please fill in this field."
        }
    }
}

function Dr(e, t) {
    e.properties[t.name] = t.default, t.hasOwnProperty("rules.properties") && (e.rules.properties || (e.rules.properties = []), e.rules.properties.push(`{${t.name}: ${t["rules.properties"]}}`))
}

function jr(e) {
    if (e.rules.properties) {
        let t = "merge($properties";
        e.rules.properties.forEach(e => {
            t = t + "," + e
        }), t += ")", e.rules.properties = t
    }
}

function kr(e) {
    return n(this, vr)[vr](e), n(this, br)[br](e), n(this, Tr)[Tr](e, "enum"), n(this, Tr)[Tr](e, "enumNames"), n(this, Or)[Or](e), n(this, Er)[Er](e), e
}

function Pr(e) {
    Nr.fieldMapping.has(e.fieldType) && (e.fieldType = Nr.fieldMapping.get(e.fieldType))
}

function Rr(e) {
    Object.keys(this.fieldPropertyMapping).forEach(t => {
        e[t] && (e[this.fieldPropertyMapping[t]] = e[t], delete e[t])
    })
}

function Sr(e) {
    Object.keys(e).forEach(t => {
        if (t.includes(".")) {
            let i = e;
            t.split(".").map((n, r, s) => {
                i = i[n] = r == s.length - 1 ? e[t] : null != i[n] ? i[n] : {}
            }), delete e[t]
        }
    })
}

function Ar(e) {
    "checkbox" != (null == e ? void 0 : e.fieldType) || e.enum && 0 != e.enum.length || (e.enum = ["on"])
}

function Ir(e, t) {
    let i;
    e && e[t] && (i = e[t].split(",").map(e => e.trim()), e[t] = i)
}

function $r(e) {
    e.required = "x" == e.required || "true" == e.required
}

function Cr(e) {
    return e && "property" == e.fieldType
}
async function Lr(e) {
    const t = null == e ? void 0 : e.querySelector('a[href$=".json"]');
    t && null != t && t.href && await (async e => {
        if (e && null != e && e.href) {
            let t = e.href;
            console.log("Loading & Converting excel form to Crispr Form"), console.time("Json Transformation (including Get)");
            const i = new Nr,
                n = await i.getFormModel(t);
            console.timeEnd("Json Transformation (including Get)"), console.log(n), console.log("Creating Form Container"), console.time("Form Model Instance Creation");
            let r = new dr({
                _formJson: null == n ? void 0 : n.formDef,
                _path: t
            });
            console.timeEnd("Form Model Instance Creation"), window.guideContainer = r, console.time("Form Rendition"), r.render(e), console.timeEnd("Form Rendition")
        }
    })(t)
}
Nr.fieldMapping = new Map([
    ["text-input", "text"],
    ["number-input", "number"],
    ["date-input", "datetime-local"],
    ["file-input", "file"],
    ["drop-down", "select"],
    ["radio-group", ""],
    ["checkbox-group", ""],
    ["plain-text", "plain-text"],
    ["checkbox", "checkbox"],
    ["multiline-input", "text-area"],
    ["panel", "panel"],
    ["submit", "button"]
]);
export {
    Lr as
    default
};