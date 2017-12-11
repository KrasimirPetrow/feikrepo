import React from 'react';
import { Form, Button, Message , Input} from 'semantic-ui-react';
import  Validator  from 'validator';
import PropTypes  from 'prop-types';
import InlineError from '../messages/inlineError';
import fucks from '../../misc/fucks'
	class LoginForm extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				data: {},
				loading: false,
				errors: {},
			};

		}

		onChange = e => this.setState({ data: {...this.state.data, [e.target.name]: e.target.value } });

		onSubmit = () => {
			const errors = this.validate(this.state.data);
			this.setState({ errors });
			if(Object.keys(errors).length === 0) {
				this.setState({loading: true})
				this.props.submit(this.state.data)
				.catch(	err => err.then( ({errors}) => {
						this.randomFuckOff(errors);
					}
				)); 
				} 
			}


		validate = (data) => {
			const errors = {};
			if(!data.password) errors.password = "Can't be blank";
			if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
			return errors;
		}
		
		getName(){
			return this.state.data.email.split('@')[0]
		}

		randomFuckOff(errors){
		 	let min = 0;
		 	let max = Math.floor(fucks.length);
			let index = Math.floor(Math.random() * (max - min)) + min;
			let fullFuckQuery = fucks[index].simple ? `${fucks[index].query}/Non-Minuvable` :`${fucks[index].query}/${this.getName()}/Non-Minuvable`   
			
			fetch(`https://foaas.com/${fullFuckQuery}`, {
				method:'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
			})
			.then( res => res.json().then( e => this.setState({fuckOff: `${e.message}`, loading: false, errors}) ) );
		}
		
		render(){
			const { loading, data, errors } = this.state
			return (
			<Form onSubmit={this.onSubmit} loading={loading}>
				{errors.global && (  
					<Message negative>
						<Message.Header>{ this.state.fuckOff }</Message.Header>
						<p>{errors.global}</p>
					</Message>
					)}
				<Form.Field error={!!errors.email} >
					<label htmlFor="email">Email</label>
					<Input
						type="text"
						placeholder="example@example.com"
						name="email"
						id="email"
						value={data.email}
						onChange={this.onChange}
					/>
					{errors.email && <InlineError text={errors.email}/>}
				</Form.Field>
				<Form.Field error={!!errors.password}>
					<label htmlFor="password">Password</label>
					<Input
						type="password"
						placeholder="Parola123"
						name="password"
						id="password"
						value={data.password}
						onChange={this.onChange}
					/>
					{errors.password && <InlineError text={errors.password}/>}
				</Form.Field>
				<Button primary>Come the fuck in or fuck the fuck off</Button>		
			</Form>
			);
		}
}
LoginForm.propTypes = {
	submit: PropTypes.func.isRequired,
}

export default LoginForm;		