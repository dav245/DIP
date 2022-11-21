<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * @method static \Illuminate\Database\Eloquent\Builder whereKey($id)
 * @method static \Illuminate\Database\Eloquent\Builder whereKeyNot($id)
 * @method static \Illuminate\Database\Eloquent\Builder where(string|array|\Closure $column, string $operator = null, $value = null, string $boolean = 'and')
 * @method static \Illuminate\Database\Eloquent\Builder whereIn(string, array)
 * @method static \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Collection|static[]|static|null find(mixed $id, array $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Collection findMany(\Illuminate\Contracts\Support\Arrayable|array $ids, array $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Model|static findOrFail($id, array $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Model findOrNew($id, array $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Model|static first()
 * @method static \Illuminate\Database\Eloquent\Model firstOrNew(array $attributes, array $values = [])
 * @method static \Illuminate\Database\Eloquent\Model firstOrCreate(array $attributes, array $values = [])
 * @method static \Illuminate\Database\Eloquent\Model updateOrCreate(array $attributes, array $values = [])
 * @method static \Illuminate\Database\Eloquent\Model|static firstOrFail(array $columns = ['*'])
 * @method static \Illuminate\Database\Eloquent\Model|static|mixed firstOr($columns = ['*'], \Closure|null $callback = null)
 * @method static \Illuminate\Database\Eloquent\Model|static create(array $attributes = [])
 * @method static \Illuminate\Database\Eloquent\Model|static make(array $attributes = [])
 * @method static \Illuminate\Database\Eloquent\Model forceCreate(array $attributes)
 * @method static \Illuminate\Contracts\Pagination\LengthAwarePaginator paginate($perPage = 15, $columns = ['*'],$pageName= 'page', $page = null)
 * @method static int update(array $values)
 * @method static \Database\Factories\BaseFactory<static> factory(... $params)
 *
 * @method \Illuminate\Database\Eloquent\Builder whereKey($id)
 * @method \Illuminate\Database\Eloquent\Builder whereKeyNot($id)
 * @method \Illuminate\Database\Eloquent\Builder where(string|array|\Closure $column, string $operator = null, $value = null, string $boolean = 'and')
 * @method \Illuminate\Database\Eloquent\Builder whereIn(string, array)
 * @method \Illuminate\Database\Eloquent\Model|\Illuminate\Database\Eloquent\Collection|static[]|static|null find(mixed $id, array $columns = ['*'])
 * @method \Illuminate\Database\Eloquent\Collection findMany(\Illuminate\Contracts\Support\Arrayable|array $ids, array $columns = ['*'])
 * @method \Illuminate\Database\Eloquent\Model|static findOrFail($id, array $columns = ['*'])
 * @method \Illuminate\Database\Eloquent\Model findOrNew($id, array $columns = ['*'])
 * @method \Illuminate\Database\Eloquent\Model|static first()
 * @method \Illuminate\Database\Eloquent\Model firstOrNew(array $attributes, array $values = [])
 * @method \Illuminate\Database\Eloquent\Model firstOrCreate(array $attributes, array $values = [])
 * @method \Illuminate\Database\Eloquent\Model updateOrCreate(array $attributes, array $values = [])
 * @method \Illuminate\Database\Eloquent\Model|static firstOrFail(array $columns = ['*'])
 * @method \Illuminate\Database\Eloquent\Model|static|mixed firstOr($columns = ['*'], \Closure|null $callback = null)
 * @method \Illuminate\Database\Eloquent\Model|static create(array $attributes = [])
 * @method \Illuminate\Database\Eloquent\Model forceCreate(array $attributes)
 * @method \Illuminate\Contracts\Pagination\LengthAwarePaginator paginate($perPage = 15, $columns = ['*'], $pageName= 'page', $page = null)
 * @method int update(array $values)
 *
 * @property int $id
 */
trait HasBaseTypings
{
}
