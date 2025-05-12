// components/Input.tsx
import React from "react";

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  placeholder?: string;
  filterType: 'name' | 'artist' | 'album';
  onFilterTypeChange: (newFilterType: 'name' | 'artist' | 'album') => void;
}

const Input: React.FC<InputProps> = (props) => {
  const { value, onChange, onSubmit, placeholder, filterType, onFilterTypeChange } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <select
          value={filterType}
          onChange={(e) => onFilterTypeChange(e.target.value as 'name' | 'artist' | 'album')}
          style={{
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc',
            marginRight: '0.5rem',
          }}
        >
          <option value="name">Name</option>
          <option value="artist">Artist</option>
          <option value="album">Album</option>
        </select>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: '0.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #ccc',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer',
            marginLeft: '0.5rem',
          }}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default Input;