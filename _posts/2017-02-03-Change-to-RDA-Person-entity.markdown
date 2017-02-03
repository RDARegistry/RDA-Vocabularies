---
title: Forthcoming change to RDA Person entity
author: Gordon Dunsire
date: 2017-02-03 19:00:00
categories: RDA_Registry RDA_entities Library_Reference_Model
---

The RDA Steering Committee's announcement on [Implementation of the LRM in RDA](http://www.rda-rsc.org/ImplementationLRMinRDA) notes that &quot;a significant change in the definition of RDA Person, to confine the scope to real human beings&quot; will be required to make the entity coherent with the Library Reference Model (LRM).

The current definition is &quot;An individual or an identity established by an individual, either alone or in collaboration with one or more other individuals.&quot;. This conflates the &quot;individual&quot; with its label or &quot;identity&quot;, and is based on the Functional Requirements for Authority Data (FRAD) conceptual model that precedes the LRM.

The LRM uses the Nomen entity to describe names, titles, and other labels, including identifiers, that are associated with any other LRM entity through the &quot;appellation&quot; relationship. Current RDA properties will become refinements of this high-level relationship, examples include [has preferred title for work](http://rdaregistry.info/Elements/w/P10223) and [has identifier for person](http://rdaregistry.info/Elements/a/P50094). For further information, see the RSC Technical Working Group paper on [RDA models for authority data](http://www.rda-rsc.org/6JSC/TechnicalWG/5).

The kind of &quot;individual&quot; is determined in some bibliographic authority control systems (that is, appellation control!) for names associated with the RDA entities Work, Expression, Manifestation, and Item, by the kind of identity indicated by the name: an individual with a &quot;personal&quot; name is a Person. Some systems treat known pseudonyms of a single real-world person as separate individuals. The scope of individual may extend to legendary entities (not necessarily human), fictitious persons, paranormal entities, and non-human entities including cartoon characters and performing animals. This is not at the whim of the cataloguer: the resources for which they create metadata describe themselves, via statements of responsibility, credits, and promotional material, as being authored, edited, etc. by such entities. The RDA instructions will be developed during the RDA Toolkit Restructure and Redesign (3R) Project to accommodate current and future requirements for accessing resources via such data.

This will allow the scope of RDA Person to be narrowed to clearly exclude fictitious and other non-human entities, bringing it into alignment with the LRM, which considers all creator agents to be human persons acting alone or in groups. The RDA Person entity will be a sub-class of RDA Agent; the RDA entities Corporate Body and Family do not require significant amendment and will be sub-classes of RDA Collective Agent. The full hierarchy is shown in [Representing the RDA ontology: Class hierarchies](http://www.rdaregistry.info/rgAbout/rdaont/ontHierarchies.html).

We therefore intend to deprecate the current RDA class [Person](http://rdaregistry.info/Elements/c/C10004) in accordance with the Registry's [Deprecation](http://www.rdaregistry.info/rgAbout/updates/deprecation.html) policy, and add a new class with the same label and a definition aligned with the LRM entity Person.

This will cause a **break in semantic compatibility** for some applications using the RDA Vocabularies, and we expect the release that includes this change to be numbered with a first-segment increment, likely to be 3.0.0, in accordance with the semantic versioning system used for Registry [Versions and releases](http://www.rdaregistry.info/rgAbout/updates/versions.html).

The change needs to be made as soon as possible to support the 3R Project and implementation of the LRM, so this &quot;major&quot; release will be scheduled soon after the release supporting the April 2017 RDA Toolkit. We expect any changes made to applications to include the impact on super-classes, and do not think it is necessary to deprecate the current RDA Agent entity.

Gordon Dunsire
