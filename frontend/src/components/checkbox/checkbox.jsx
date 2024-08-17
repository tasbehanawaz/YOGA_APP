import React, { useState } from 'react';
import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from '@material-tailwind/react';
import PropTypes from 'prop-types';

export function CheckboxVerticalListGroup({ labels, onChange }) {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) => {
      const newCheckedItems = { ...prev, [index]: !prev[index] };
      onChange(newCheckedItems);
      return newCheckedItems;
    });
  };

  return (
    <Card>
      <List>
        {labels.map((label, index) => (
          <ListItem key={index} className="p-0">
            <label
              htmlFor={`vertical-list-${index}`}
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  id={`vertical-list-${index}`}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: 'p-0',
                  }}
                  checked={!!checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                {label}
              </Typography>
            </label>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

CheckboxVerticalListGroup.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};
