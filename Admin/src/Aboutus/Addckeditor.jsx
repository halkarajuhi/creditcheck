import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Navbar from '../common/header/Navbar';
import Sidebar from '../common/header/Sidebar';
import { Link } from 'react-router-dom';

class Addckeditor extends Component {
    constructor( props ) {
		super( props );

		this.state = {
			content: '',
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
    submitdata(e){
    
        axios.post('http://localhost:5000/aboutus/adddata', this.state, {
            "headers": {
                "content-type": "application/json",
            },
        })
            .then(res => {
                console.log(res.data.response)
                localStorage.setItem('aboutid',res.data.response)
               
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
               <Link className="btn btn-outline-primary btnclass"  to={{ pathname: `/Updateckeditor`}}>Update</Link>
                        <main style={{ marginTop:'7%'}}>
                          
                            <div class="containar-fluid px-5 ">

                                <div class="report_form">
                                <form>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.content || ''}
                                onChange={this.handleEditorChange()}
                            />
                            <button type="button" class="btn btn-primary" style={{margin:'15px'}} onClick={()=>this.submitdata()}>Submit</button>
                            </form>
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

export default Addckeditor;
