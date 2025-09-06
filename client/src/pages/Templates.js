import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Save, 
  Upload, 
  Download, 
  Trash2, 
  Plus,
  FileText,
  Settings,
  Play
} from 'lucide-react';
import toast from 'react-hot-toast';

const TemplatesContainer = styled.div`
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

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const TemplateCard = styled.div`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const TemplateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TemplateIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 0.5rem;
  background: ${props => props.color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
`;

const TemplateInfo = styled.div`
  flex: 1;
`;

const TemplateName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.25rem 0;
`;

const TemplateDescription = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
`;

const TemplateStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TemplateActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  flex: 1;
  background: ${props => props.variant === 'primary' ? '#6366f1' : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : '#1e293b'};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : '#e2e8f0'};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover {
    background: ${props => props.variant === 'primary' ? '#4f46e5' : '#f1f5f9'};
  }
`;

const DangerButton = styled(ActionButton)`
  color: #ef4444;
  border-color: #ef4444;
  
  &:hover {
    background: rgba(239, 68, 68, 0.1);
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
  max-width: 500px;
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

const FileInput = styled.input`
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

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #64748b;
`;

const presetTemplates = [
  {
    id: 'contact-scraper',
    name: 'Contact Information Scraper',
    description: 'Extract emails, phones, and addresses from contact pages',
    rules: [
      { name: 'Email Addresses', type: 'regex', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
      { name: 'Phone Numbers', type: 'regex', pattern: '(\\+?1[-.\\s]?)?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})' },
      { name: 'Addresses', type: 'regex', pattern: '(\\d+\\s+[A-Za-z0-9\\s,.-]+(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Way|Place|Pl|Court|Ct|Circle|Cir|Parkway|Pkwy|Highway|Hwy|Route|Rt|North|N|South|S|East|E|West|W|Northeast|NE|Northwest|NW|Southeast|SE|Southwest|SW))' }
    ],
    color: '#6366f1'
  },
  {
    id: 'social-media-scraper',
    name: 'Social Media Scraper',
    description: 'Find social media profiles and links',
    rules: [
      { name: 'Facebook', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?facebook\\.com\\/[a-zA-Z0-9._-]+' },
      { name: 'Twitter', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?twitter\\.com\\/[a-zA-Z0-9._-]+' },
      { name: 'LinkedIn', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?linkedin\\.com\\/in\\/[a-zA-Z0-9._-]+' },
      { name: 'Instagram', type: 'regex', pattern: '(?:https?:\\/\\/)?(?:www\\.)?instagram\\.com\\/[a-zA-Z0-9._-]+' }
    ],
    color: '#8b5cf6'
  },
  {
    id: 'business-info-scraper',
    name: 'Business Information Scraper',
    description: 'Extract business names, hours, and contact details',
    rules: [
      { name: 'Business Names', type: 'css', selector: 'h1, .business-name, .company-name' },
      { name: 'Phone Numbers', type: 'regex', pattern: '(\\+?1[-.\\s]?)?\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})' },
      { name: 'Email Addresses', type: 'regex', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
      { name: 'Addresses', type: 'css', selector: '.address, .location, [itemprop="address"]' }
    ],
    color: '#10b981'
  }
];

function Templates({ rules, onLoadRules }) {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    if (rules.length === 0) {
      toast.error('No rules to save');
      return;
    }

    try {
      const template = {
        name: templateName,
        description: templateDescription,
        rules: rules,
        createdAt: new Date().toISOString()
      };

      const dataStr = JSON.stringify(template, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${templateName.replace(/\s+/g, '-').toLowerCase()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Template saved successfully!');
      setShowSaveModal(false);
      setTemplateName('');
      setTemplateDescription('');
    } catch (error) {
      toast.error('Failed to save template: ' + error.message);
    }
  };

  const handleLoadTemplate = async (template) => {
    try {
      onLoadRules(template.rules);
      toast.success(`Template "${template.name}" loaded successfully!`);
    } catch (error) {
      toast.error('Failed to load template: ' + error.message);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const template = JSON.parse(e.target.result);
          if (template.rules && Array.isArray(template.rules)) {
            onLoadRules(template.rules);
            toast.success(`Template "${template.name}" loaded successfully!`);
          } else {
            toast.error('Invalid template file format');
          }
        } catch (error) {
          toast.error('Failed to parse template file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <TemplatesContainer>
      <Header>
        <Title>Rule Templates</Title>
        <HeaderActions>
          <Button onClick={() => setShowLoadModal(true)}>
            <Upload size={16} />
            Load Template
          </Button>
          <Button onClick={() => setShowSaveModal(true)} variant="primary">
            <Save size={16} />
            Save Current Rules
          </Button>
        </HeaderActions>
      </Header>

      <TemplatesGrid>
        {presetTemplates.map((template) => (
          <TemplateCard key={template.id}>
            <TemplateHeader>
              <TemplateIcon color={template.color}>
                <Settings size={24} />
              </TemplateIcon>
              <TemplateInfo>
                <TemplateName>{template.name}</TemplateName>
                <TemplateDescription>{template.description}</TemplateDescription>
              </TemplateInfo>
            </TemplateHeader>

            <TemplateStats>
              <Stat>
                <StatValue>{template.rules.length}</StatValue>
                <StatLabel>Rules</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{template.rules.filter(r => r.type === 'regex').length}</StatValue>
                <StatLabel>Regex</StatLabel>
              </Stat>
              <Stat>
                <StatValue>{template.rules.filter(r => r.type === 'css').length}</StatValue>
                <StatLabel>CSS</StatLabel>
              </Stat>
            </TemplateStats>

            <TemplateActions>
              <ActionButton onClick={() => handleLoadTemplate(template)} variant="primary">
                <Play size={16} />
                Load
              </ActionButton>
              <ActionButton onClick={() => {
                const dataStr = JSON.stringify(template, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }}>
                <Download size={16} />
                Download
              </ActionButton>
            </TemplateActions>
          </TemplateCard>
        ))}
      </TemplatesGrid>

      {showSaveModal && (
        <Modal onClick={() => setShowSaveModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Save Template</ModalTitle>
              <CloseButton onClick={() => setShowSaveModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Template Name</Label>
              <Input
                type="text"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="Enter template name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description (Optional)</Label>
              <Input
                type="text"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Enter description"
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowSaveModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveTemplate} variant="primary">
                <Save size={16} />
                Save Template
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}

      {showLoadModal && (
        <Modal onClick={() => setShowLoadModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Load Template</ModalTitle>
              <CloseButton onClick={() => setShowLoadModal(false)}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Upload Template File</Label>
              <FileInput
                type="file"
                accept=".json"
                onChange={handleFileUpload}
              />
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button onClick={() => setShowLoadModal(false)}>
                Cancel
              </Button>
            </div>
          </ModalContent>
        </Modal>
      )}
    </TemplatesContainer>
  );
}

export default Templates;