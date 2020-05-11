import React from 'react';

function EmailPreview (props){
            return(
    
            <p>
            <p className='p-3 bg-primary text-white m-0'><b>{props.subject}</b></p>
            <div className='px-2' dangerouslySetInnerHTML={props.content} />
          </p>
    );
    }

 
export default EmailPreview;

