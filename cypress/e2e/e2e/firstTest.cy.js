//This reference enables methods available in cypress
/// <reference types="cypress" /> 
//it -> method, arg1 - HelloWorld- Testname, arg2- javascript calledback function

//test hooks before and after
beforeEach('Open the test application', () => {
    cy.visit('/')
})

it('Hello world1', () => {

})

it('Hello world2', () => {

})

//Describe- is used to organise the test in the suit

describe("Test Suit1", () =>{

    it('Hello world3', () => {

}),

it('Hello world4', () => {

})

describe("Test Suit2", () =>{
    it('Hello world3', () => {

}),

it('Hello world4', () => {

})
})
})

describe("Test Suit3", () =>{
    it('Hello world3', () => {

}),

it('Hello world4', () => {

})
})

