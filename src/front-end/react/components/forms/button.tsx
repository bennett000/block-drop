import * as React from 'react';

export function Button({ onClick, value }) {
  return (<input type='button' value={ value } onClick={ onClick } readOnly className='mh1 mh2-ns pa1 ph3-ns h2-5 h3-m h3-5-l react-blue shadow-react-blue br3 br4-ns bg-transparent b--react-blue bw1 bw2-m bw3-l'/>);
}
