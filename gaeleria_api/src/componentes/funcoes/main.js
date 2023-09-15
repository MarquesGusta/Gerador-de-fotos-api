import React from "react";
import { useEffect } from "react";
import "./style.css";

export default function Main(){

    // Carrega as informações antes da página ser renderizada
    useEffect(() => {

        // classe onde primero vamos declarar as propriedades que vamos utilizar do html / alem disso vamos declarar a chave que autoriza o uso da API
        class PhotoGallery{
            constructor(){
                this.API_KEY = 'yyJqfjaIewwjwwzrXS0PRnctV7gFKoOnD8VSVgRdALQTdG7g5YKEbitD';
                this.galleryDIv = document.querySelector('.gallery');
                this.searchForm = document.querySelector('.header form');
                this.loadMore = document.querySelector('.load-more');
                this.logo = document.querySelector('.logo')
                this.pageIndex = 1;
                this.searchValueGlobal = '';
                this.eventHandle();
            }
            eventHandle(){
                document.addEventListener('DOMContentLoaded',()=>{
                    this.getImg(1);
                });
                this.searchForm.addEventListener('submit', (e)=>{
                    this.pageIndex = 1;
                    this.getSearchedImages(e);
                });
                this.loadMore.addEventListener('click', (e)=>{
                    this.loadMoreImages(e);
                })
                this.logo.addEventListener('click',()=>{
                    this.pageIndex = 1;
                    this.galleryDIv.innerHTML = '';
                    this.getImg(this.pageIndex);
                })
            }
            // aqui declaramos a URL da API utilizada para pegar as imagens
            // o endpoint com o termo 'curated' permite que seja recebido fotos em tempo real selecionadas pela equipe do Pexels.
            async getImg(index){
                this.loadMore.setAttribute('data-img', 'curated');
                const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12&pr-BR`;
                const data = await this.fetchImages(baseURL);
                this.GenerateHTML(data.photos)
                console.log(data) 
            }
            async fetchImages(baseURL){
                const response = await fetch(baseURL,{
                    method: 'GET',
                    headers:{
                        Accept: 'application/json',
                        Authorization: this.API_KEY
                    }
                });
                const data = await response.json();
                return data;
            }

            // aqui declaramos um metodo para gerar a estrutura do html com as imagens e os textos com nome dos fotografos
            GenerateHTML(photos){
                photos.forEach(photo=>{
                const item = document.createElement('div');
                item.classList.add('item');
                item.innerHTML = `
                <a href= '${photo.src.original}' target="_blank">
                    <img src="${photo.src.medium}">
                    <h3>${photo.photographer}</h3>
                </a> 
                `;
                this.galleryDIv.appendChild(item)
                });
            }
            

            async getSearchedImages(e){
                this.loadMore.setAttribute('data-img', 'search');
                e.preventDefault();
                this.galleryDIv.innerHTML='';
                const searchValue = e.target.querySelector('input').value;
                this.searchValueGlobal = searchValue;
                const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12&pr-BR`
                const data = await this.fetchImages(baseURL);
                this.GenerateHTML(data.photos);
                e.target.reset();
            }
        
            async getMoreSearchedImages(index){
                const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12&pr-BR`
                const data = await this.fetchImages(baseURL);
                console.log(data)
                this.GenerateHTML(data.photos);
            }
            
            // aqui declaramos um metodo que faz a requisição de mais imagens 
            loadMoreImages(e){
                let index = ++this.pageIndex;
                const loadMoreData = e.target.getAttribute('data-img');
                if(loadMoreData === 'curated'){
                    // Carrega a próxima página
                    this.getImg(index)
                }else{
                    this.getMoreSearchedImages(index);}
            } 
        }
        const gallery = new PhotoGallery();
        
    });
    

    // retorna fotos com base no que foi colocado no input com a estrutura declarada
    return(

        <center>
            {/* <div className="container"> */}
                <div className="header">
                    <h1 className="cabecaio">Gerador de fotos</h1>
                    <h1 className="logo">Galeria</h1>
                    <form>
                        <input type="text" placeholder="procura" />
                    </form>
                </div>

                <div className="gallery">
                        {/* <!-- itens  --> */}
                </div>
                <button className="load-more" data-img='curated'>Load More</button>
            {/* </div> */}
        </center>
    );

}