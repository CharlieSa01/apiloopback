import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Ruta, RutaRelations, Estacion} from '../models';
import {EstacionRepository} from './estacion.repository';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id,
  RutaRelations
> {

  public readonly origenFk: BelongsToAccessor<Estacion, typeof Ruta.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('EstacionRepository') protected estacionRepositoryGetter: Getter<EstacionRepository>,
  ) {
    super(Ruta, dataSource);
    this.origenFk = this.createBelongsToAccessorFor('origenFk', estacionRepositoryGetter,);
    this.registerInclusionResolver('origenFk', this.origenFk.inclusionResolver);
  }
}
