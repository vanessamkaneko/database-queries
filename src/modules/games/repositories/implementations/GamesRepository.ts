import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }


  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository
      .createQueryBuilder("games")
      .where("games.title ILIKE :title", { title: `%${param}%`})
      .getMany()
    // Complete usando query builder

    /* 
    :title: This is a placeholder for the parameter.
    { title: %${param}% }: This is the actual parameter object, where title corresponds to the placeholder in the query, 
    and %${param}% is the value that will be safely injected into the query. 
    */
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT COUNT(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.repository
      .createQueryBuilder("users")
      .relation(Game, "users")
      .of(id)
      .loadMany()
    // Complete usando query builder
  }
}
