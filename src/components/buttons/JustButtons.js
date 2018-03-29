import React, {Component} from 'react';
import styled,  { css, keyframes } from 'styled-components';

export class GeneralButton extends Component {
    render() {
        const fontColor = this.props.color ? this.props.color : 'white';
        const customColor = this.props.background ? this.props.background  : 'grey'
        const boxColor = this.props.background  ? this.props.background .split('(').filter((e)=> {
            if(typeof parseInt(e) == "number"){
                return parseInt(e);
             }
            }).join(',').split(')').filter((c)=> {
            if(typeof parseInt(c) == "number"){
                if(parseInt(c) - 35 > 0){
                    return (parseInt(c) - 35);
                }else{
                    return parseInt(c) - 35;
                }  
             }
            }).join('').split(',').map(g => {
                if((+g - 35) <= 0){
                return +g
            }else {
                return +g - 35
            }
            }) : ''

        const darker = boxColor ? `rgb(${boxColor[0]}, ${boxColor[1]}, ${boxColor[2]})`: 'grey'


        const Button = styled.button`
            font-size: 16px;
            border-radius: 3px;
            height: 40px;
            width: 140px;
            text-shadow: 0px 0px 2px ${darker};
            background: ${customColor};
            color: ${fontColor};
            box-shadow: 0px 5px 0px ${darker};
            font-family: Verdana;
            border: none;
            margin-bottom: 4px;
            transition: .1s;
            &:hover {
                color:rgb(245,245,245);
                cursor: pointer;
                
            }
            &:active {
                box-shadow: 0px 1px 0px ${darker};
                margin-top: 4px;
                margin-bottom: 0px;
                border: none;
            }
            &:focus {
                outline:0;
            }
            `
        return (
            <Button onClick={() => this.props.action()}>{this.props.label}</Button>
        );
    }
}



export class AnimButton extends Component {
    
    render() {

        const back = this.props.background ? this.props.background : 'transparent';

        const AnimButton = styled.button`
            height: 40px;
            width: 140px;
            font-size: 16px;
            border-radius: 20px;
            background: ${back};
            border: solid 2px ${this.props.color};
            color: ${this.props.color};
            transition: .3s;
            &:hover {
                background:${this.props.color};
                cursor: pointer;
                color: white;
                
            }
            &:active {
                
                border: none;
            }
            &:focus {
                outline:0;
            }
            `
       


        return (
            <AnimButton onClick={() => this.props.action()}>
               
                        {this.props.label}
                   
            </AnimButton>
        );
    }
}

export class WipeButton extends Component {
    
    render() {

        const back = this.props.background ? this.props.background : 'red'
        const WipeButton = styled.button`
            width: 140px;
            height 40px;
            border: solid 3px ${back};
            padding: 4px;
            background: transparent;
            box-sizing: border-box;
            border-radius: 2px;
            transition: .2s;
            cursor: pointer;
            &:hover {
                padding: 0px
                border-color:pink;
            }
            &:focus {
                outline:0;
            }
            `
        const InsideDiv = styled.div`
            height: 100%;
            width: 100%;
            background: ${back};
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            font-size: 16px;
            ${WipeButton}:hover & {
                 background: pink;
              }
            `


        return (
            <WipeButton  onClick={() => this.props.action()}>
               <InsideDiv>
                        {this.props.label}
                </InsideDiv>
            </WipeButton>
        );
    }
}