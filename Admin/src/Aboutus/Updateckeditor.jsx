import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { Link ,useParams} from 'react-router-dom';



class Updateckeditor extends Component {
    constructor( props ) {
		super( props );

		this.state = {
			content: '<p>Initial data.</p>',
            id:localStorage.getItem('aboutid')
		};
	}
handleEditorChange() {
		return ( event, editor ) => {
			this.setState( { content: editor.getData() } );
           
			console.log( this.state);
           
		}
	}
 componentDidMount() {
        console.log(this.state.id)
  
        fetch(`http://localhost:5000/aboutus/getsingledata/`+this.state.id)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.response);
            this.setState( { content: data.response.about_page } );
           
        })
        .catch((err) => {
            console.log(err);
        });
      }
 updatedata(){
        console.log(this.state.content)
      
        axios.put('http://localhost:5000/aboutus/updatedata/'+this.state.id,this.state ,{
            "headers": {
                "content-type": "application/json",
            },
        })
           .then(res => {
                console.log(res.data)
                 });
    }

	render() {
		return (
     <div class="sb-nav-fixed">
            <Navbar />
            <div id="layoutSidenav">
                <Sidebar />
                <div id="layoutSidenav_content">
              
               <div class="pt-4 pb-5">
               <Link className="btn btn-outline-primary btnclass"  to={{ pathname: `/Addckeditor`}}>Add</Link>
                        <main style={{ marginTop:'7%'}}>
                          
                            <div class="containar-fluid px-5 ">

                                <div class="report_form">
                              
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.content || ''}
                                onChange={this.handleEditorChange()}
                            />
                            <button type="button" class="btn btn-primary" style={{margin:'15px'}} onClick={()=>this.updatedata()}>Submit</button>
                         
                                </div>
                            </div>
                        </main>

                    </div>
                </div>
            </div>

        </div>		
		);
	}
}

export default Updateckeditor;
