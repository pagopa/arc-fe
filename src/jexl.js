/* eslint-disable */
const jexl = require('jexl');


//'return (Number(inner_addizionale_belluno_totale) + Number(inner_sostitutiva_belluno_totale)).toFixed(2)';
const evaluate_1 = '(Number(inner_addizionale_belluno_totale) + Number(inner_sostitutiva_belluno_totale)) | toFixed(2)';

jexl.addFunction('Number', Number);
jexl.addTransform('toFixed', (val, length) => Number(val).toFixed(length));
jexl.addTransform('indexOf', (val, char) => String(val).indexOf(char));
jexl.addTransform('split', (val, char) => String(val).split(char));
jexl.addTransform('length', (val) => Array(val).length);
jexl.addTransform('replace', (val, char, sub) => String(val).replace(char, sub));


context = {
  inner_addizionale_belluno_totale: '12',
  inner_sostitutiva_belluno_totale: '6.50',
  inner_addizionale_belluno_rata: '5.', 
  badInput: '(() => "you fool!")()'
}

console.log(jexl.evalSync(evaluate_1, context))

console.log(jexl.evalSync('badInput()', context))

/* if (inner_addizionale_belluno_rata != '') {
     if (inner_addizionale_belluno_rata.indexOf('.') == -1) {
        return inner_addizionale_belluno_rata+'00'
      } else {
        if(inner_addizionale_belluno_rata.split('.')[1].length == 1) {
          return inner_addizionale_belluno_rata.replace('.','')+'0' 
        } else { 
          return inner_addizionale_belluno_rata.replace('.','')
        }
      }
    } else {
      return inner_addizionale_belluno_rata
    },
*/
//"inner_addizionale_belluno_rata!=''){if(inner_addizionale_belluno_rata.indexOf('.')==-1){return inner_addizionale_belluno_rata+'00'}else{if(inner_addizionale_belluno_rata.split('.')[1].length==1){return inner_addizionale_belluno_rata.replace('.','')+'0'}else{return inner_addizionale_belluno_rata.replace('.','')}}}else{return inner_addizionale_belluno_rata}",

const evaluate_2 = 
  `inner_addizionale_belluno_rata != '' ? 
      inner_addizionale_belluno_rata | indexOf('.') == -1 ?
        inner_addizionale_belluno_rata + '00' 
      : (inner_addizionale_belluno_rata | split('.')[1] | length) == 1 ? 
        inner_addizionale_belluno_rata | replace('.', '') + '0' : 
        inner_addizionale_belluno_rata | replace('.', '')
   : inner_addizionale_belluno_rata`

console.log('inner_addizionale_belluno_rata', jexl.evalSync(evaluate_2, context))
