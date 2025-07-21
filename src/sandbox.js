const sand = require('@nyariv/sandboxjs');

const Sandbox = sand.default;

const code = `Number.prototype.toFixed = () => 100; return (Number(inner_addizionale_belluno_totale) + Number(inner_sostitutiva_belluno_totale)).toFixed(3)`;

const scope = {
  inner_addizionale_belluno_totale: '12.5',
  inner_sostitutiva_belluno_totale: '6.50',
  inner_addizionale_belluno_rata: '5.',
  cf: 'ABCD'
};

const sandbox = new Sandbox();

console.log(sandbox.compile(code)(scope).run()); // result: "18.50"

//console.log(process.pid);

//sandbox.compile('process.pid')(scope).run(); // result: "18.50"

// const code2 = `if (inner_addizionale_belluno_rata != '') {
//      if (inner_addizionale_belluno_rata.indexOf('.') == -1) {
//         return inner_addizionale_belluno_rata+'00'
//       } else {
//         if(inner_addizionale_belluno_rata.split('.')[1].length == 1) {
//           return inner_addizionale_belluno_rata.replace('.','')+'0'
//         } else {
//           return inner_addizionale_belluno_rata.replace('.','')
//         }
//       }
//     } else {
//       return inner_addizionale_belluno_rata
//     }`;

// console.log(sandbox.compile(code2)(scope).run());
