const { expect } = require("chai");
const deepEqual = require("./deepEqual");

describe("deepEqual", () => {
	it("should return TRUE given undefined, undefined", () => {
		expect(deepEqual(undefined, undefined)).to.equal(true);
	});

	it("should return TRUE given null, null", () => {
		expect(deepEqual(null, null)).to.equal(true);
	});

	it("should return FALSE given null, {}", () => {
		expect(deepEqual(null, {})).to.equal(false);
	});

	it("should return FALSE given null, undefined", () => {
		expect(deepEqual(null, undefined)).to.equal(false);
	});

	it("should return FALSE given undefined, {}", () => {
		expect(deepEqual(undefined, {})).to.equal(false);
	});

	it("should return FALSE given '', {}", () => {
		expect(deepEqual('', {})).to.equal(false);
	});

	it("should return FALSE given the values are of different type", () => {
		expect(deepEqual('1234', 1234)).to.equal(false);
	});

	it("should return TRUE given two value equal objects", () => {
		expect(deepEqual({ name: "Bob" }, { name: "Bob" })).to.equal(true);
	});

	it("should return FALSE given two unequal objects", () => {
		expect(deepEqual({ name: "Bob", email: 'bob@example.com' }, { name: "Bob" })).to.equal(false);
	});

	it("should return FALSE given two unequal objects, one having an additional field that has null value", () => {
		expect(deepEqual({ name: "Bob", email: null }, { name: "Bob" })).to.equal(false);
	});

	it("should return TRUE given two unequal objects, BUT first object having an additional field that has undefined value", () => {
		expect(deepEqual({ name: "Bob", email: undefined }, { name: "Bob" })).to.equal(true);
	});

	it("should return TRUE given two unequal objects, BUT second object having an additional field that has undefined value", () => {
		expect(deepEqual({ name: "Bob" }, { name: "Bob", email: undefined })).to.equal(true);
	});

	it("should return FALSE given two unequal objects, second object having an additional property with all child nodes being undefined values", () => {
		expect(deepEqual({ name: "Bob" }, { name: "Bob", address: { city: undefined, pin: undefined} })).to.equal(false);
	});

	it("should return TRUE given two unequal objects, but one object having an additional field that has undefined value", () => {
		expect(deepEqual({ name: "Bob", address: { city: undefined, pin: undefined} }, { name: "Bob", address: { city: undefined } })).to.equal(true);
	});

	it("should return FALSE given two unequal objects, one object having a null value compared to similar value in other object having undefined", () => {
		expect(deepEqual({ name: "Bob", address: { city: undefined, pin: null} }, { name: "Bob", address: { city: undefined, pin: undefined } })).to.equal(false);
	});

	it("should return FALSE given two unequal objects, one object having a null value compared to a missing field in the other", () => {
		expect(deepEqual({ name: "Bob", address: { city: undefined, pin: null} }, { name: "Bob", address: { city: undefined } })).to.equal(false);
	});

	it("should return TRUE given two equal objects, both having matching undefined values", () => {
		expect(deepEqual({ name: "Bob", address: { city: undefined, pin: undefined} }, { name: "Bob", address: { city: undefined, pin: undefined} })).to.equal(true);
	});

	it("should return TRUE given both objects refer to the same location in the memory", () => {
		let obj1 = { name: "Bob", email: 'bob@example.com', address: { city: 'Sydney', pin: null, state: undefined }};
		let obj2 = obj1;
		expect(deepEqual(obj1, obj2)).to.equal(true);
	});
});
