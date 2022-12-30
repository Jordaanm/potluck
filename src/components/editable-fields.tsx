import type { User } from "@prisma/client";
import { useState } from "react";
import { DishTypeSelect } from "./potluck/dish-type-select";

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
}

const plainViewClasses = 'cursor-pointer border-b-2 border-[#cfa168]';
const editViewClasses = 'border-b-2 border-[#cfa168]';

export const EditableText = (props: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.value);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.toString());
    setIsDirty(true);
  };

  if(isEditing) {
    return (
      <input
        className={editViewClasses}
        autoFocus
        type="text"
        value={value}
        onChange={onChange}
        onBlur={() => {
          setIsEditing(false);
          if(isDirty) {
            props.onChange(value);
          }
        }}
      />
    );
  }

  return (
    <span
      className={plainViewClasses}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </span>
  );
};

interface EditableNumberProps {
  value: number;
  onChange: (value: number) => void;
}

export const EditableNumber = (props: EditableNumberProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.valueAsNumber);
    setIsDirty(true);
  };

  if(isEditing) {
    return (
      <input
        className={editViewClasses}
        autoFocus
        type="number"
        value={value}
        onChange={onChange}
        onBlur={() => {
          setIsEditing(false);
          if(isDirty) {
            props.onChange(value);
          }
        }}
      />
    );
  }

  return (
    <span
      className={plainViewClasses}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </span>
  );
};



interface EditableDishTypeProps {
  value: string;
  onChange: (value: string) => void;
}

export const EditableDishType = (props: EditableDishTypeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setIsDirty(true);
  };

  if(isEditing) {
    return (
      <DishTypeSelect
        className={editViewClasses}
        value={value}
        onChange={onChange}
        onBlur={() => {
          setIsEditing(false);
          if(isDirty) {
            props.onChange(value);
          }
        }}
      />
    );
  }

  return (
    <span
      className={plainViewClasses}
      onClick={() => setIsEditing(true)}
    >
      {value}
    </span>
  );
};

interface EditableUserProps {
  value: User | null;
  onChange: (id: string) => void;
  attendees: User[];
}

export const EditableUser = (props: EditableUserProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<User|undefined>(props?.value || undefined);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const { attendees } = props;

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(attendees.find(g => g.id === e.target.value));
    setIsDirty(true);
  };

  if(isEditing) {
    return (
      <select
        className={editViewClasses}
        value={value?.id}
        onChange={onChange}
        onBlur={() => {
          setIsEditing(false);
          if(isDirty) {
            props.onChange(value?.id || '');
          }
        }}
      >
        {props.attendees.map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
    );
  }

  return (
    <span
      className={plainViewClasses}
      onClick={() => setIsEditing(true)}
    >
      {value?.name || 'Someone'}
    </span>
  );
};