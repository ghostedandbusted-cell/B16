import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save,
  Mail,
  Phone,
  MapPin,
  Share2,
  Code,
  Search
} from 'lucide-react';
import toast from 'react-hot-toast';

const RuleBuilderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  background: ${props => props.variant === 'primary' ? '#6366f1' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#1e293b'};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : '#e2e8f0'};
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#4f46e5' : '#f1f5f9'};
  }
`;

const RulesList = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const RuleItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const RuleInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RuleIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const RuleDetails = styled.div`
  flex: 1;
`;

const RuleName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
`;

const RuleDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

const RuleActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 3rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #64748b;
  
  &:hover {
    background: #f1f5f9;
    color: #1e293b;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  min-height: 120px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const PresetRules = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PresetCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #6366f1;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
`;

const PresetIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 0.375rem;
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  margin-bottom: 0.5rem;
`;

const PresetTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
`;

const PresetDescription = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const ruleTypes = [
  { value: 'regex', label: 'Regex Pattern', icon: Code, color: '#6366f1' },
  { value: 'css', label: 'CSS Selector', icon: Search, color: '#10b981' },
  { value: 'xpath', label: 'XPath', icon: Search, color: '#f59e0b' },
  { value: 'custom', label: 'Custom Script', icon: Code, color: '#8b5cf6' },
];

const presetRules = [
  {
    name: 'Email Addresses',
    type: 'regex',
    pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    description: 'Extract email addresses from text',
    icon: Mail,
    color: '#6366f1'
  },
  {
    name: 'Phone Numbers',
    type: 'regex',
    pattern: '(\\+?1[-.\\s]?)?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})',
    description: 'Extract phone numbers',
    icon: Phone,
    color: '#10b981'
  },
  {
    name: 'Social Media Links',
    type: 'regex',
    pattern: '(?:https?:\\/\\/)?(?:www\\.)?(?:facebook\\.com|twitter\\.com|linkedin\\.com|instagram\\.com)\\/[a-zA-Z0-9._-]+',
    description: 'Extract social media profile links',
    icon: Share2,
    color: '#8b5cf6'
  },
  {
    name: 'Addresses',
    type: 'regex',
    pattern: '(\\d+\\s+[A-Za-z0-9\\s,.-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Place|Pl|Court|Ct|Circle|Cir|Parkway|Pkwy|Highway|Hwy|Route|Rt|North|N|South|S|East|E|West|W|Northeast|NE|Northwest|NW|Southeast|SE|Southwest|SW))',
    description: 'Extract street addresses',
    icon: MapPin,
    color: '#f59e0b'
  }
];

function RuleBuilder({ rules, onAddRule, onUpdateRule, onDeleteRule }) {
  const [showModal, setShowModal] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'regex',
    pattern: '',
    selector: '',
    script: '',
    description: ''
  });

  const handleAddRule = () => {
    setEditingRule(null);
    setFormData({
      name: '',
      type: 'regex',
      pattern: '',
      selector: '',
      script: '',
      description: ''
    });
    setShowModal(true);
  };

  const handleEditRule = (rule) => {
    setEditingRule(rule);
    setFormData({
      name: rule.name,
      type: rule.type,
      pattern: rule.pattern || '',
      selector: rule.selector || '',
      script: rule.script || '',
      description: rule.description || ''
    });
    setShowModal(true);
  };

  const handlePresetClick = (preset) => {
    setFormData({
      name: preset.name,
      type: preset.type,
      pattern: preset.pattern,
      selector: '',
      script: '',
      description: preset.description
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter a rule name');
      return;
    }

    try {
      if (editingRule) {
        await onUpdateRule(editingRule.id, formData);
        toast.success('Rule updated successfully');
      } else {
        await onAddRule(formData);
        toast.success('Rule created successfully');
      }
      setShowModal(false);
    } catch (error) {
      toast.error('Error saving rule: ' + error.message);
    }
  };

  const getRuleIcon = (type) => {
    const ruleType = ruleTypes.find(rt => rt.value === type);
    return ruleType ? ruleType.icon : Code;
  };

  const getRuleColor = (type) => {
    const ruleType = ruleTypes.find(rt => rt.value === type);
    return ruleType ? ruleType.color : '#6366f1';
  };

  return (
    <RuleBuilderContainer>
      <Header>
        <Title>Rule Builder</Title>
        <HeaderActions>
          <Button onClick={handleAddRule}>
            <Plus size={16} />
            Add Rule
          </Button>
        </HeaderActions>
      </Header>

      <PresetRules>
        {presetRules.map((preset, index) => (
          <PresetCard key={index} onClick={() => handlePresetClick(preset)}>
            <PresetIcon color={preset.color}>
              <preset.icon size={16} />
            </PresetIcon>
            <PresetTitle>{preset.name}</PresetTitle>
            <PresetDescription>{preset.description}</PresetDescription>
          </PresetCard>
        ))}
      </PresetRules>

      <RulesList>
        {rules.length === 0 ? (
          <EmptyState>
            <p>No rules configured yet. Add your first rule to get started!</p>
          </EmptyState>
        ) : (
          rules.map((rule, index) => {
            const IconComponent = getRuleIcon(rule.type);
            const color = getRuleColor(rule.type);
            
            return (
              <RuleItem key={rule.id || index}>
                <RuleInfo>
                  <RuleIcon color={color}>
                    <IconComponent size={20} />
                  </RuleIcon>
                  
                  <RuleDetails>
                    <RuleName>{rule.name}</RuleName>
                    <RuleDescription>
                      {rule.description || `${rule.type} - ${rule.pattern || rule.selector || 'Custom script'}`}
                    </RuleDescription>
                  </RuleDetails>
                </RuleInfo>
                
                <RuleActions>
                  <ActionButton onClick={() => handleEditRule(rule)} title="Edit">
                    <Edit2 size={16} />
                  </ActionButton>
                  <ActionButton onClick={() => onDeleteRule(rule.id)} title="Delete">
                    <Trash2 size={16} />
                  </ActionButton>
                </RuleActions>
              </RuleItem>
            );
          })
        )}
      </RulesList>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>
                {editingRule ? 'Edit Rule' : 'Add New Rule'}
              </ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Rule Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter rule name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Rule Type</Label>
                <Select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  {ruleTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              {formData.type === 'regex' && (
                <FormGroup>
                  <Label>Regex Pattern</Label>
                  <Input
                    type="text"
                    value={formData.pattern}
                    onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
                    placeholder="Enter regex pattern"
                    required
                  />
                </FormGroup>
              )}

              {(formData.type === 'css' || formData.type === 'xpath') && (
                <FormGroup>
                  <Label>{formData.type === 'css' ? 'CSS Selector' : 'XPath Expression'}</Label>
                  <Input
                    type="text"
                    value={formData.selector}
                    onChange={(e) => setFormData({ ...formData, selector: e.target.value })}
                    placeholder={`Enter ${formData.type === 'css' ? 'CSS selector' : 'XPath expression'}`}
                    required
                  />
                </FormGroup>
              )}

              {formData.type === 'custom' && (
                <FormGroup>
                  <Label>Custom JavaScript</Label>
                  <TextArea
                    value={formData.script}
                    onChange={(e) => setFormData({ ...formData, script: e.target.value })}
                    placeholder="Enter custom JavaScript code"
                    required
                  />
                </FormGroup>
              )}

              <FormGroup>
                <Label>Description (Optional)</Label>
                <Input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
                />
              </FormGroup>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <Button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  <Save size={16} />
                  {editingRule ? 'Update Rule' : 'Create Rule'}
                </Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      )}
    </RuleBuilderContainer>
  );
}

export default RuleBuilder;