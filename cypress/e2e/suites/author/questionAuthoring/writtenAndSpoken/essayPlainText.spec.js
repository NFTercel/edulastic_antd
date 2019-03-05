import EditItemPage from '../../../../framework/author/itemList/itemDetail/editPage';
import EssayPlainTextPage from '../../../../framework/author/itemList/questionType/writtenAndSpoken/essayPlainTextPage';

describe('Author - "Essay with plain text" type question', () => {
  const queData = {
      group: 'Written & Spoken',
      queType: 'Essay with plain text',
      queText: 'Describe yourself in one sentence?',
      extlink: 'www.testdomain.com',
      testtext: 'testtext',
      copycut: 'testcopycutpaste',
      formula: 's=ar^2'
  };

  const question = new EssayPlainTextPage();
  const editItem = new EditItemPage();
  let preview;

  before(() => {
    cy.setToken();
  });

  context('User creates question.', () => {
    before('visit items page and select question type', () => {
      editItem.getItemWithId('5c358b480c8e6f22190d5ce0');
      editItem.deleteAllQuestion();
      // create new que and select type
      editItem.addNew()
        .chooseQuestion(queData.group, queData.queType);
    });

    it('test => user create question with default option and save', () => {   
      // enter question
      question.getQuestionEditor()
        .clear()
        .type(queData.queText)
        .should('have.text',queData.queText);

      // save que
      question.header.save();
    });

    it('test => preview - verify default cut/copy/paste options' , () => {
      preview = question.header.preview();
      // verify copy paste option
      question.getTextEditor()
        .clear()
        .type(queData.testtext);
  
      question.getTextEditor().then($ele => {
        $ele.select();
      })

      question.getCopy()
        .click();
      
      question.getTextEditor()
        .type(queData.copycut);

      question.getPaste()
        .click();

      question.getTextEditor()
      .should('have.text',`${queData.testtext}${queData.copycut}${queData.testtext}`)
        
      // verify cut paste option
      question.getTextEditor()
        .clear()
        .type(queData.testtext);
  
      question.getTextEditor().then($ele => {
        $ele.select();
      })

      question.getCut()
        .click();
      
      question.getTextEditor()
        .type(queData.copycut);

      question.getPaste()
        .click();

      question.getTextEditor()
      .should('have.text',`${queData.copycut}${queData.testtext}`)
    })

    it('test => preview - validate word limit on typing ans text', () => {
      question.getTextEditor()
        .clear();
      
      // typing 5 words
      const words = [1,2,3,4,5];
      var i;
      for(i in words){
        question.getTextEditor()
          .type(queData.testtext)
          .type(' ');
        
        question.getWordCount()
          .should('have.text',words[i]+' Words');
      }

      // typing overlimit
      question.getTextEditor()
          .type(queData.testtext);
      
      // validate 
      question.getTextEditor()
        .should('have.css','background-color','rgb(251, 223, 231)')
      
      question.getWordCount()
        .should('have.text','6 / 5 Word limit');
    });

  });
});