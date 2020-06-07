class Api::V1::MoviesController < ApplicationController
  def index
    render json: Movie.all
  end

  def create
    movie = Movie.create(movie_params)
    render json: movie
  end

  def destroy
    Movie.destroy(params[:id])
  end

  def update
    movie = Movie.find(params[:id])
    movie.update_attributes(movie_params)
    render json: movie
  end

  private

  def movie_params
    params.require(:movie).permit(:id, :name, :summary, :genre, :year)
  end
end