import { Component, PropTypes } from 'react';

export const dataType = PropTypes.arrayOf(PropTypes.object);

export const columnType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  header: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  selector: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  sortable: PropTypes.bool,
  render: PropTypes.func,
});

export const sortType = PropTypes.shape({
  columnId: PropTypes.string,
  direction: PropTypes.oneOf(['ASC', 'DESC']),
})

export const styleType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.object,
]);

export const classNameType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.string,
]);
