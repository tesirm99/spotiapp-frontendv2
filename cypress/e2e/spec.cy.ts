describe('login', () => {
  it('login correct', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('#emailInp').type('tesi123@gmail.com');
    cy.get('#passInp').type('123456');
    cy.get('[type="submit"]').click();
    cy.get('.buttons-last-slot > :nth-child(2)').click();
  })

  it('login incorrect', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('#emailInp').type('tesi2@gmail.com');
    cy.get('#passInp').type('123456787');
    cy.get('[type="submit"]').click();
    cy.get('.buttons-last-slot > .md');
  })

  it('login incorrect - bad email', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('#emailInp').type('tesi2gmail.com');
    cy.get('#passInp').type('123456787');
    cy.get('[type="submit"]').should('be.disabled');
    
  });

})

describe('register', () => {
  it('register correct', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('#goToRegister').click();
    cy.get('#emailInp').type('cypres3333s@test.com');
    cy.get('#passInp').type('123456');
    cy.get('[type="submit"]').click();
    cy.get('.buttons-last-slot > :nth-child(2)').click();
  });

  it('register incorrect - bad email', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('.sc-ion-buttons-md-h > :nth-child(2)').click();    
    cy.get('#emailInp').type('cypresstest.com');
    cy.get('#passInp').type('123456');
    cy.get('[type="submit"]').should('be.disabled');
  });

  it('register incorrect - bad password', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('.sc-ion-buttons-md-h > :nth-child(2)').click();    
    cy.get('#emailInp').type('cypress@test');
    cy.get('#passInp').type('123');
    cy.get('[type="submit"]').should('be.disabled');
  });

  it('register incorrect - bad password and email', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('.sc-ion-buttons-md-h > :nth-child(2)').click();    
    cy.get('#emailInp').type('cypresstest');
    cy.get('#passInp').type('123');
    cy.get('[type="submit"]').should('be.disabled');
  });

});

describe('insert song', () => {
  it('insert song correct', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('#emailInp').type('tesi123@gmail.com');
    cy.get('#passInp').type('123456');
    cy.get('[type="submit"]').click();
    cy.get('.buttons-last-slot > :nth-child(1)').click();
    cy.get('#titleInp').type('test');
    cy.get('#artistInp').type('test');
    cy.get('#albumInp').type('test');
    cy.get('#dateInp').type('2023-06-22');
    cy.get('#genreInp').type('test');
    cy.get('#durationInp').type('2');
    cy.get('#urlInp').type('test');
    cy.get('#imgInp').type('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/312px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg');
    cy.get('[type="submit"]').click();
    cy.wait(4000);
  });

});

describe('song search', () => {

  it('search by name correct', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('#ion-input-0').type('test');
    cy.get('#searchBtn').click();
    cy.get('ion-card-title.ion-inherit-color').contains('test');
  });

  it('search by artist correct', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get(':nth-child(2) > .ng-untouched').click();
    cy.get('#ion-input-0').type('test');
    cy.get('#searchBtn').click();
    cy.get('ion-card-title.ion-inherit-color').contains('test');
  });

  it('search by date correct', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get(':nth-child(3) > .ng-untouched').click();
    cy.get('#ion-input-1').type('2023-06-22');
    cy.get('#searchBtn').click();
    cy.get(':nth-child(1) > ion-card-header.ion-inherit-color > ion-card-title.ion-inherit-color').contains('asdf');
  });

  it('search by name incorrect', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('#ion-input-0').type('una cancion que no existe');
    cy.get('#searchBtn').click();
    cy.get('h1').contains('There are no songs to display');
  });

  it('search by artist incorrect', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get(':nth-child(2) > .ng-untouched').click();
    cy.get('#ion-input-0').type('un artista que no existe');
    cy.get('#searchBtn').click();
    cy.get('h1').contains('There are no songs to display');
  });

  it('search by date incorrect', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get(':nth-child(3) > .ng-untouched').click();
    cy.get('#ion-input-1').type('3023-06-18');
    cy.get('#searchBtn').click();
    cy.get('h1').contains('There are no songs to display');
  });

  it('search on Spotify', () => {
    cy.visit('http://spotiapp.tesirm.tech/home');
    cy.get('.buttons-last-slot > .md').click();
    cy.get('#emailInp').type('tesi2@gmail.com');
    cy.get('#passInp').type('123456');
    cy.get('[type="submit"]').click();
    cy.get(':nth-child(4) > .ng-untouched').click();
    cy.get('#ion-input-0').type('Highway to hell');
    cy.get('#searchBtn').click();
    cy.get('.filterContainer > :nth-child(2) > :nth-child(1) > :nth-child(1)');
  });

});